// After my internship interview with HP, I was curious about searching algorithms and stumbled
// upon the following video: https://commons.wikimedia.org/wiki/File:MAZE_30x20_DFS.ogv
// It shows how a variant of a depth first search algorithm can be used to generate
// a maze. I spent the next little bit engineering this algorithm which generates a random 
// non-cyclical maze to use in this game. Essentially, the maze starts as all walls and 
// the algorithm "carves" out the maze.

// namespace for NCMaze
var NCMaze = function(pxDim, pyDim) {
   this.xDim = pxDim;
   this.yDim = pyDim;
   this.maze = []; // 2D array of booleans which holds the maze. 1 = wall, 0 = open space
   initializeMaze();
   this.startNode = {x:0, y:0};
   maze[startNode.x][startNode.y] = true;
   finishNode;
   this.directionsList = ["right", "left", "up", "down"]
}

// initialize the maze to all 0s
NCMaze.prototype.initializeMaze = function(){
   for (y = 0; y < xDim; y++)
   {
      row = []
      for (x = 0; x < xDim; x++)
         row.push(1) // push a wall
      maze.push(row)
   }      
};

NCMaze.prototype.getMaze = function(){
   return maze;
};

// Generate the maze. Each "node" pushed onto the stack represents an open square in the maze
// (an "open square" is a square that is not a wall). Choose a random direction to go.
// 
NCMaze.prototype.generateMaze = function(){
   stack = new Array();
   //push starting node onto stack
   stack.push(startNode);
      // add new nodes until there are no more allowable spaces to create on the map
      while stack !empty
         nextNode = getRandomAdjacentNode(stack.top)
         if (nextNode == null)
            stack.pop();
         else
            finishNode = nextNode;
            push(nextNode)
            maze[nextNode.y][nextNode.x] = true
};


NCMaze.prototype.getRandomAdjacentNode = function(node)
{
   decisionMade = false
   directionsList = this.directionsList.slice(0)
   choice = getRandom(directions)
   nextNode = undefined
   
   // choose the next direction to go
   while (!decisionMade)
   {
      switch(direction)
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
            choice = "none"
            decisionMade = true;
            nextNode = undefined;
            break;
      }
      
      if (!decisionMade)
      {
         directionList.remove(choice);   // TODO: check to see if this works
         choice = getRandom(directions); // TODO: implement this
      }
   }   
   return nextNode;
};

NCMaze.prototype.adjacentNodesAreEmpty = function(node, origin)
{
   x = node.x
   y = node.y
   directionsList = ["up", "left", "down", "right"]
   directionsList.remove(origin) // TODO: check to see if this works
   isEmpty = true;
   
   for (direction : directionList)
      if direction === "right"
         isEmpty *= locationIsEmpty(x + 1, y)
      else if direction === "left"
         isEmpty *= locationIsEmpty(x - 1, y)
      else if direction === "up"
         isEmpty *= locationIsEmpty(x, y + 1)
      else if direction === "down"
         isEmpty *= locationIsEmpty(x, y - 1)

   return isEmpty
}

NCMaze.prototype.locationIsEmpty = function(x,y)
{
   // check for out of bounds (out of bounds is considered empty)
   emptyCheck = false
   if x < 0 || x >= xDim
      emptyCheck = true
   else if y < 0 || y >= yDim
      emptyCheck = true
   else
      emptyCheck = !!maze[y][x]

   return !emptyCheck;
}