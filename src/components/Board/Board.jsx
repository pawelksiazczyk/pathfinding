import React, {useState, useEffect} from 'react';
import "./Board.css";
import Node from "../Node/Node";

const Board = () => {

  const [grid, setGrid] = useState([]);
  const [startPoint, setStartPoint] = useState({});
  const [finishPoint, setFinishPoint] = useState({});
  const [walls, setWalls] = useState([]);
  const [isStartButtonActive, setIsStartButtonActive]= useState(false)
  const [isFinishButtonActive, setIsFinishButtonActive] = useState(false)
  const [isWallButtonActive, setIsWallButtonActive] = useState(false);
  const [isMouseButtonDown, setIsMouseButtonDown] = useState(false);

  useEffect(() => {
    createInitialGrid()
  }, [])

  const mouseButtonDown= () => {
    setIsMouseButtonDown(true)
  }

  const mouseButtonUp = () => {
    setIsMouseButtonDown(false)
  }

  const handleStartButton = () => {
    setIsStartButtonActive(prev => !prev);
    if(isFinishButtonActive) {
      setIsFinishButtonActive(false)
    }
    if(isWallButtonActive) {
      setIsWallButtonActive(false)
    }
  }

  const handleFinishButton = () => {
    setIsFinishButtonActive(prev => !prev);
    if (isStartButtonActive) {
      setIsStartButtonActive(false)
    }
    if (isWallButtonActive) {
      setIsWallButtonActive(false)
    }
  }

  const handleWallButton = () => {
    setIsWallButtonActive(prev => !prev);
    if (isStartButtonActive) {
      setIsStartButtonActive(false)
    }
    if (isFinishButtonActive) {
      setIsFinishButtonActive(false)
    }
  }

  const createNode = (row, col) => {
    const node = {
      row: row,
      col: col,
      isStart: false,
      isFinish: false,
      isWall: false,
      distance: Infinity
    }
    return node
  }

  const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 40; row++) {
      const rowArray = []
      for (let col = 0; col < 30; col++) {
        rowArray.push(createNode(row, col))
      }
      grid.push(rowArray);
      setGrid(grid);
    }
  }

  const updateNode = (row, col) => {
    if (isStartButtonActive) {
      const newGrid = [...grid];

      if (startPoint.row) {
        const prevStartPoint = { ...startPoint };
        const startNode = newGrid[prevStartPoint.row][prevStartPoint.col]
        const reset = {
          ...startNode,
          isStart: false
        }
        newGrid[prevStartPoint.row][prevStartPoint.col] = reset;

      }

      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isStart: true
      }
      newGrid[row][col] = newNode;
      setStartPoint(newNode)
      setGrid(newGrid);
    }
    else if (isFinishButtonActive) {
      const newGrid = [...grid];

      if (finishPoint.row) {
        const prevFinishPoint = { ...finishPoint };
        const finishNode = newGrid[prevFinishPoint.row][prevFinishPoint.col]
        const reset = {
          ...finishNode,
          isFinish: false
        }
        newGrid[prevFinishPoint.row][prevFinishPoint.col] = reset;

      }

      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isFinish: true
      }
      newGrid[row][col] = newNode;
      setFinishPoint(newNode)
      setGrid(newGrid);
    } else if (isWallButtonActive) {
      const newGrid = [...grid];

      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: true
      }
      newGrid[row][col] = newNode;
      setFinishPoint(newNode)
      setGrid(newGrid);
    }
  }

  const updateWalls = (row, col) => {
    if (isWallButtonActive && isMouseButtonDown) {
      const newGrid = [...grid];

      const node = newGrid[row][col];
      const newNode = {
        ...node,
        isWall: true
      }
      newGrid[row][col] = newNode;
      setFinishPoint(newNode)
      setGrid(newGrid);
    }
  }

  return (
    <div className="board__container">
      <div className="board__buttons">
        <button onClick={handleStartButton}>Start</button>
        <button onClick={handleWallButton}>Wall</button>
        <button onClick={handleFinishButton}>Finish</button>
      </div>
      
      <div className="board__nodes">
        {
          grid.map((nodes, rowIdx) => {
            return (<div key={rowIdx}>
              {
                nodes.map((node, colIdx) => {
                  const {col, row, isStart, isFinish, isWall} = node;
                  return <Node 
                            key={colIdx} 
                            row={row} 
                            col={col} 
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            updateNode={updateNode}
                            updateWalls={updateWalls}
                            mouseButtonDown={mouseButtonDown}
                            mouseButtonUp={mouseButtonUp}
                          />
                })
              }

            </div>)
          })
        }
      </div>
      
    </div>
  )
}

export default Board
