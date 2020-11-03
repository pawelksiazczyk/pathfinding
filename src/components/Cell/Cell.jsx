import React from 'react';
import "./Cell.css"

const Cell = ({col, row, leftWall, rightWall, topWall, bottomWall, isVisited, isCurrent, refs ,id}) => {

  const isLeftWall = `${leftWall ? "left__wall" : ""}`
  const isRightWall = `${rightWall ? "right__wall" : ""}`
  const isTopWall = `${topWall ? "top__wall" : ""}`
  const isBottomWall = `${bottomWall ? "bottom__wall" : ""}`
  const visited = `${isVisited ? "isVisited" : ""}`
  const current = `${isCurrent ? "isCurrent" : ""}`;
  

  const style = `cell ${isLeftWall} ${isRightWall} ${isTopWall} ${isBottomWall} ${visited} ${current}`;

  return (
    <div ref={refs} id={id} className={style}>
      
    </div>
  )
}

export default Cell
