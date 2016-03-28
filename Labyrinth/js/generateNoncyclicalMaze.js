// After my internship interview with HP, I was curious about searching algorithms and stumbled
// upon the following video: https://commons.wikimedia.org/wiki/File:MAZE_30x20_DFS.ogv
// It shows how a variant of a depth first search algorithm can be used to generate
// a maze. I spent the next little bit engineering this algorithm which generates a random 
// non-cyclical maze to use in this game. Essentially, the maze starts as all walls and 
// the algorithm "carves" out the maze.

/*************************************************************
* This algorithm is still incomplete. I started converting it 
* from the pseudocode that I wrote into JavaScript, but it still
* needs some tweeks.
**************************************************************/

// namespace for NCMaze
var NCMaze = function(pxDim, pyDim) {
   this.xDim = pxDim;
   this.yDim = pyDim;
   this.maze = []; // 2D array of booleans which holds the maze. 1 = wall, 0 = open space
   initializeMaze();
   this.startNode = {x:0, y:0};
   this.finishNode = {x:0, y:0};
   this.directionsList = ["right", "left", "up", "down"]
   maze[startNode.x][startNode.y] = true;

   // initialize the maze to all 1s
   this.initializeMaze = function(){
      for (y = 0; y < xDim; y++)
      {
         row = []
         for (x = 0; x < this.xDim; x++)
            row.push(1) // wall
         maze.push(row)
      }      
   };

   // Generate the maze. Each "node" pushed onto the stack represents an open square in the maze
   // (an "open square" is a square that is not a wall). Choose a random direction to go.
   this.generateMaze = function(){
      var stack = new Array();
      //push starting node onto stack
      stack.push(startNode);
         // add new nodes until there are no more allowable spaces to create on the map
         while (stack.length > 0)
         {
            var nextNode = getNextNode(stack.top)
            if (nextNode === null)  // no more empty adjacent nodes
            {
               stack.pop();
            }

            else // advance to an empty space
            {
               this.finishNode = nextNode;
               push(nextNode);
               maze[nextNode.y][nextNode.x] = true;
            }
         }
   };


   this.getNextNode = function(node)
   {
      nextNode = null;
      decisionMade = false;
      directionsList = this.directionsList.slice(0); // start with a clone of the list
      choice = getRandomElement(directions);
      
      // choose the next direction to go
      while (!decisionMade)
      {
         switch(choice)
         {
            case("right"):
               nextNode = {x: node.x + 1, y: node.y); 
               if(nodeIsInBounds(nextNode, "left") // make sure the next node is in bounds
               {
                  if(adjacentNodesAreEmpty(nextNode) // make sure it's adjacent nodes are all empty)
      	           decisionmade = true;
               }
               break;

            case("left"):
               nextNode = {x: node.x - 1, y: node.y};
               if(nodeIsInBounds(nextNode)
               {
                  if(adjacentNodesAreEmpty(nextNode, "right")
      	           decisionmade = true;
               }
               break;

            case("up"):
               nextNode = {x: node.x, y: node.y - 1};
               if(nodeIsInBounds(nextNode)
               {
                  if(adjacentNodesAreEmpty(nextNode, "down")
                     decisionmade = true;
               }
               break;

            case("down"):
               nextNode = {x: node.x, y: node.y + 1};
               if(nodeIsInBounds(nextNode)
               {
                  if(adjacentNodesAreEmpty(nextNode, "up")
      	           decisionmade = true;
               }
               break;

            default:
               decisionMade = true;
               nextNode = null;
               break;
         }
         
         if (!decisionMade) // try again
         {
            removeElement(array, choice) 
            choice = getRandomElement(directions);
         }
      }
      return nextNode;
   };

   this.removeElement = function(array, element)
   {
      var index = array.indexOf(choice);
      if(i != -1) 
      {
         array.splice(i, 1);
      }
   }

   NCMaze.prototype.adjacentNodesAreEmpty = function(node, origin)
   {
      x = node.x
      y = node.y
      directionsList = ["up", "left", "down", "right"]
      directionsList.remove(origin) // TODO: check to see if this works
      isEmpty = true;
      
      for (direction : directionList)
         if (direction === "right")
            isEmpty *= locationIsEmpty(x + 1, y)
         else if (direction === "left")
            isEmpty *= locationIsEmpty(x - 1, y)
         else if (direction === "up")
            isEmpty *= locationIsEmpty(x, y + 1)
         else if (direction === "down")
            isEmpty *= locationIsEmpty(x, y - 1)

      return isEmpty
   };

   // returns a random element of the parameter array
   this.getRandomElement = function(array)
   {
      return array[Math.floor(Math.random() * myArray.length)];
   }

   // Checks to see if this.maze[y][x] is empty.
   // This is used instead of directly accessing the array to avoid out of bounds issues.
   this.locationIsEmpty = function(x,y)
   {
      // check for out of bounds (out of bounds is considered empty)
      emptyCheck = false
      if (x < 0 || x >= xDim) // out of bounds
         emptyCheck = false
      else if (y < 0 || y >= yDim) // out of bounds
         emptyCheck = false
      else
         emptyCheck = !!maze[y][x] // in bounds

      return !emptyCheck;
   };
};