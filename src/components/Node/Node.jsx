import React from 'react';
import "./Node.css";

const Node = ({key, col, row, isStart, isFinish, isWall, updateNode, updateWalls, mouseButtonDown, mouseButtonUp}) => {
  return (
    <div 
      className={`${isStart ? "node start" : isFinish ? "node finish" : isWall ? "node wall" : "node"}`}
      onClick={() => updateNode(row, col)}
      onMouseEnter={() => updateWalls(row,col)}
      onMouseDown={() => mouseButtonDown()}
      onMouseUp={() => mouseButtonUp()}
    >
      
    </div>
  )
}

export default Node
