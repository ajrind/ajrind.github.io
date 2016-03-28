/*
* The MIT License (MIT)
* Copyright (c) 2016 Andrew Rindfleisch  (http://ajrind.github.io)
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
* and associated documentation files (the "Software"), to deal in the Software without restriction, 
* including without limitation the rights to use, copy, modify, merge, publish, distribute, 
* sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or 
* substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
* NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// After my internship interview with HP, I was curious about searching algorithms and stumbled
// upon the following video: https://commons.wikimedia.org/wiki/File:MAZE_30x20_DFS.ogv
// It shows how a variant of a depth first search algorithm can be used to generate
// a maze. I spent the next little bit engineering this algorithm which generates a random 
// non-cyclical maze to use in this game. Essentially, the maze starts as all walls and 
// the algorithm "carves" out the maze.

// Non-Cylical Maze Generator.
// 1. Instantiate this class
// 2. Call generateMaze()
// 3. The maze is now stored as a 2D array in this.maze; 0's represent the paths in the maze and 1's represent the walls of the maze 
var NCMaze = function(xDim, yDim) 
{
   this.xDim = xDim;
   this.yDim = yDim;
   this.maze = []; // 2D array of booleans which holds the maze. 1 = wall, 0 = open space
   this.startNode = {x:1, y:1};
   this.finishNode = {x:0, y:0};
   this.directionsList = ["right", "left", "up", "down"];
   this.visited = [];

   this.initializeMaze = function()
   {
      for (y = 0; y < this.xDim; y++)
      {
         var row = [];
         for (x = 0; x < this.xDim; x++)
         {
            row.push("1"); // wall
         }
         this.maze.push(row);   
      }
      // "hollow out" the start node
      this.maze[this.startNode.x][this.startNode.y] = '0';
   };

   // Generate the maze. Each "node" pushed onto the stack represents an open square in the maze
   // (an "open square" is a square that is not a wall). Choose a random direction to go.
   this.generateMaze = function()
   {
      // start with all walls
      this.initializeMaze();

      //push starting node onto stack
      var stack = new Array();
      stack.push(this.startNode);

      
      var count = 0;
      var finishPlaced = false;

      // add new nodes until there are no more allowable spaces to create on the map
      while (stack.length > 0)
      {
         var currentNode = stack[stack.length - 1];
         var nextNode = this.getNextNode(currentNode); // the top node
         
         // reached a dead end (all adjacent walls are invalid candidates)
         if (nextNode === null)
         {
            // place the finish at the end of the first complete path (this is usually one of the longest paths)
            if (!finishPlaced) 
            {                  
               this.finishNode.x = currentNode.x;
               this.finishNode.y = currentNode.y;
               finishPlaced = true;
            }
            stack.pop();
         }

         // advance to next node
         else 
         {
            stack.push(nextNode);
            this.maze[nextNode.y][nextNode.x] = '0';
         }
           count++;
      }

      // mark the start and finish
      this.maze[this.startNode.y][this.startNode.x] = "S";
      this.maze[this.finishNode.y][this.finishNode.x] = "F";
   };


   this.getNextNode = function(node)
   {
      var nextNode = null;
      var decisionMade = false;
      var directions = this.directionsList.slice(0); // start with a clone of the list
      var choice = this.getRandomElement(directions);

      // choose the next direction to go
      while (!decisionMade)
      {
         switch(choice)
         {
            case("right"):
               nextNode = {x: node.x + 1, y: node.y};
               if (this.locationIsWall(nextNode.x, nextNode.y)) //only visit this node if it hasn't been visited yet
               {
                  var adjacentNodes = new Array();
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y - 1}); // above
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y + 1}); // below
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y    }); // right
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y - 1}); // upper right
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y + 1}); // lower right
                  if(this.nodesAreWalls(adjacentNodes))  // make sure this node's adjacent nodes are all walls
                  {
                     decisionMade = true;
                  }
               }
               break;

            case("left"):
               nextNode = {x: node.x - 1, y: node.y};
               if (this.locationIsWall(nextNode.x, nextNode.y))
               {
                  var adjacentNodes = new Array();
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y - 1}); // above
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y + 1}); // below
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y    }); // left
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y - 1}); // upper left
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y + 1}); // lower left
                  if(this.nodesAreWalls(adjacentNodes))  // make sure this node's adjacent nodes are all walls
                  {
                     decisionMade = true;
                  }
               }
               break;

            case("up"):
               nextNode = {x: node.x, y: node.y - 1};
               if (this.locationIsWall(nextNode.x, nextNode.y)) //don't visit nodes that have already been visited
               {
                  var adjacentNodes = new Array();
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y - 1}); // above
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y    }); // right
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y    }); // left
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y - 1}); // upper right
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y - 1}); // upper left
                  if(this.nodesAreWalls(adjacentNodes))  // make sure this node's adjacent nodes are all walls
                  {
                     decisionMade = true;
                  }
               }
               break;

            case("down"):
               nextNode = {x: node.x, y: node.y + 1};
               if (this.locationIsWall(nextNode.x, nextNode.y)) //don't visit nodes that have already been visited
               {
                  var adjacentNodes = new Array();
                  adjacentNodes.push({x: nextNode.x,     y: nextNode.y + 1}); // below
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y    }); // right
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y    }); // left
                  adjacentNodes.push({x: nextNode.x + 1, y: nextNode.y + 1}); // lower right
                  adjacentNodes.push({x: nextNode.x - 1, y: nextNode.y + 1}); // lower left
                  if(this.nodesAreWalls(adjacentNodes))  // make sure this node's adjacent nodes are all walls
                  {
                     decisionMade = true;
                  }
               }
               break;

            default:
               decisionMade = true;
               nextNode = null;
               break;
         }

         if (!decisionMade) // try again
         {
            this.removeElement(directions, choice);
            choice = this.getRandomElement(directions);
         }
      }

      return nextNode;
   };

   this.nodesAreWalls = function(nodesToCheck)
   {
      var allNodesAreWalls = true;
      for (var i = 0; i < nodesToCheck.length; i++)
      {
         if(!this.locationIsWall(nodesToCheck[i].x, nodesToCheck[i].y))
         {
            allNodesAreWalls = false;
            break;
         }
      }
      return allNodesAreWalls;
   }

   // returns a random element of the parameter array
   this.getRandomElement = function(array)
   {
      return array[Math.floor(Math.random() * array.length)];
   }

   // removes the element from the array
   this.removeElement = function(array, element)
   {
      var index = array.indexOf(element);
      if(index != -1) 
      {
         array.splice(index, 1);
      }
   };

   // Checks to see if this.maze[y][x] is empty.
   // This is used instead of directly accessing the array to avoid out of bounds issues.
   // Out of bounds is not considered a wall; this assumption forces the algorithm to create 
   // the outer wall around the maze.
   this.locationIsWall = function(x,y)
   {
      // check for out of bounds (out of bounds is considered empty)
      var isWall = false
      if (x < 0 || x >= this.xDim) // out of bounds
      {
         isWall = false;
      }
      else if (y < 0 || y >= this.yDim) // out of bounds
      {
         isWall = false;
      }
      else
      {
         var string = "FALSE";
         if (this.maze[y][x] === '1')
         {
            isWall = true;
            string = "TRUE";
         }
      }
      return isWall;
   };
};