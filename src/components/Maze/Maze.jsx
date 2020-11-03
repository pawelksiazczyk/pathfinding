import React, { useState, useEffect, useRef, createRef } from 'react';
import "./Maze.css";
import Cell from "../Cell/Cell";
import { firstAlgorithm } from "../mazeAlgorithm/MazeAlgorithm";
import { divide } from "../mazeAlgorithm/RecursiveDivision"

const Maze = () => {

  const [grid, setGrid] = useState([]);
  const [currentCell, setCurrentCell] = useState({row: 0, col: 0, isVisited: true})
  const [stack, setStack] = useState([]);
  const [isStartFirst, setIsStartFirst] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const refs = useRef([]);

  refs.current = []


  const setData = (el, position) => {
    setTimeout(() => {
      if (position === "bottom") {
        refs.current[el.row * 30 + el.col].classList.add("bottom")
      } else if (position === "right") {
        refs.current[el.row * 30 + el.col].classList.add("right")
      } else if (position === "gap-bottom") {
        refs.current[el.row * 30 + el.col].classList.add("gap-bottom")
      } else if (position === "gap-right") {
        refs.current[el.row * 30 + el.col].classList.add("gap-right")
      }
    }, 1000)
   
  }

  const addRefs = (el) => {
    //console.log("sialalala",el)
    if(el && !refs.current.includes(el)) {
      refs.current.push(el)
    }
  }

  useEffect(() => {
    console.log(refs.current)
  }, [refs.current])

  useEffect(() => {
    const initialGrid = createInitialGrid()
    setGrid(initialGrid)
  }, [])

  useEffect(() => {
    setIsStartFirst(false)
    setTimeout(() => {
      const initialGrid = createInitialGrid()
      setGrid(initialGrid);
      setStack([])
    }, 100)
    
  }, [isStop])

  useEffect(() => {
    (() => {
      if (isStartFirst) {
        setTimeout(() => {
          firstAlgorithm(currentCell, grid, setStack, setCurrentCell, stack)
        }, 20)
      } 
    })()
  }, [currentCell, isStartFirst])

  const startRevursive = () => {
    const data = JSON.parse(JSON.stringify(grid))
    divide(data, setData, 0, 40, 0, 30, "horizontal");
  }

  const createNode = (row, col) => {
    const node = {
      row: row,
      col: col,
      leftWall: true,
      topWall: true,
      rightWall: true,
      bottomWall: true,
      isVisited: false,
      isCurrent: false
    }
    return node
  }

  const createInitialGrid = () => {
    const gridArray = [];
    for (let row = 0; row < 40; row++) {
      const rowArray = []
      for (let col = 0; col < 30; col++) {
        rowArray.push(createNode(row, col))
      }
      gridArray.push(rowArray);
    }
    return gridArray;
  }

  return (
    <div className="maze__container">
      <div className="maze__buttons__container">
        <button className="maze__buttons" onClick={() => setIsStartFirst(prev => !prev)}>Start</button>
        <button className="maze__buttons" onClick={() => setIsStop(prev => !prev)}>Reset</button>
        <button className="maze__buttons" onClick={startRevursive}>Recursive</button>
      </div>

      <div className="maze__nodes">
        {
          grid?.map((nodes, rowIdx) => {
            return (<div key={rowIdx}>
              {
                nodes?.map((node, colIdx) => {
                  const { col, row, leftWall, rightWall, topWall, bottomWall, isVisited, mazeBottom, mazeRight } = node;
                  return <Cell
                    refs={addRefs}
                    id={`node-${rowIdx}-${colIdx}`}
                    key={colIdx}
                    row={row}
                    col={col}
                    mazeBottom={mazeBottom}
                    mazeRight={mazeRight}
                    leftWall={leftWall}
                    rightWall={rightWall}
                    topWall={topWall}
                    bottomWall={bottomWall}
                    isVisited = {isVisited}
                    isCurrent={currentCell.row === row && currentCell.col === col}
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

export default Maze
