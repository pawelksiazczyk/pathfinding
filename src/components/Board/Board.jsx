import React, {useState, useEffect} from 'react';
import "./Board.css";
import Node from "../Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/Dijkstra';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Board = () => {

  const [grid, setGrid] = useState([]);
  const [startPoint, setStartPoint] = useState({});
  const [finishPoint, setFinishPoint] = useState({});
  const [isStartButtonActive, setIsStartButtonActive]= useState(false)
  const [isFinishButtonActive, setIsFinishButtonActive] = useState(false)
  const [isWallButtonActive, setIsWallButtonActive] = useState(false);
  const [isMouseButtonDown, setIsMouseButtonDown] = useState(false);

  useEffect(() => {
    const initialGrid = createInitialGrid()
    setGrid(initialGrid)
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

  const visualizeDijkstra = () => {
    console.log("visualizeDijkstra")
    const newGrid = [...grid]
    const visitedNodesInOrder = dijkstra(newGrid, startPoint, finishPoint);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishPoint);
    console.log(nodesInShortestPathOrder)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for(let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length && nodesInShortestPathOrder.length > 1) { 
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 30 * i)
        return;
      } else if (i === visitedNodesInOrder.length && nodesInShortestPathOrder.length === 1){
        setTimeout(() => {
          console.log("BRAAAK")
        }, 20 * i)
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = [...grid];
        const newNode = {
          ...node,
          visited: true
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid)
      }, 10 * i)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const newGrid = [...grid];
        const newNode = {
          ...node,
          isVisited: false,
          isPath: true
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid)
      }, 25 * i);
    }
  }

  const createNode = (row, col) => {
    const node = {
      row: row,
      col: col,
      isStart: false,
      isFinish: false,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
      isPath: false
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
    }
    return grid;
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
    } else if (isFinishButtonActive) {
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
      setGrid(newGrid);
    }
  }

  return (
    <div className="board__container">
      <div className="board__buttons">
        <button onClick={visualizeDijkstra}>Show</button>
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
                  const {col, row, isStart, isFinish, isWall, isVisited, visited, isPath} = node;
                  return <Node 
                            key={colIdx} 
                            row={row} 
                            col={col} 
                            isStart={isStart}
                            isFinish={isFinish}
                            isWall={isWall}
                            isVisited={visited}
                            updateNode={updateNode}
                            updateWalls={updateWalls}
                            mouseButtonDown={mouseButtonDown}
                            mouseButtonUp={mouseButtonUp}
                            isPath={isPath}
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
