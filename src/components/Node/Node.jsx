import React from 'react';
import "./Node.css";

const Node = ({col, row, isStart, isFinish, isWall, isVisited, updateNode, updateWalls, mouseButtonDown, mouseButtonUp, isPath}) => {
  return (
    <div 
      className={`${isStart ? "node start" : isFinish ? "node finish" : isWall ? "node wall" : isVisited ? "node visited" : isPath ? "node path" : "node"}`}
      onClick={() => updateNode(row, col)}
      onMouseEnter={() => updateWalls(row,col)}
      onMouseDown={() => mouseButtonDown()}
      onMouseUp={() => mouseButtonUp()}
    >
      
    </div>
  )
}

export default Node
