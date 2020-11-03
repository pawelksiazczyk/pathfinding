export const firstAlgorithm = (currentCell, grid, setStack, setCurrentCell, stack) => {
  const nextCell = checkNeighbors(currentCell, grid)
  changeCurrentCell(currentCell, nextCell, grid, setStack, setCurrentCell, stack)
}

const checkNeighbors = (currentCell, grid) => {
  if (currentCell.row > 0 && currentCell.col > 0 && currentCell.row < 39 && currentCell.col < 29) {
    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const right = grid[currentCell.row + 1][currentCell.col];
    const left = grid[currentCell.row - 1][currentCell.col];
    const bottom = grid[currentCell.row][currentCell.col + 1]

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (right && !right.isVisited) {
      neighbors.push(right)
    }

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }
  } else if (currentCell.row === 0 && currentCell.col !== 0) {

    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const right = grid[currentCell.row + 1][currentCell.col];
    const bottom = grid[currentCell.row][currentCell.col + 1]

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (right && !right.isVisited) {
      neighbors.push(right)
    }

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.col === 0 && currentCell.row !== 0) {
    const neighbors = [];
    const left = grid[currentCell.row - 1][currentCell.col];
    const top = grid[currentCell.row][currentCell.col - 1];
    const bottom = grid[currentCell.row][currentCell.col + 1]

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.row === 39 && currentCell.col !== 29) {

    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const left = grid[currentCell.row - 1][currentCell.col];
    const bottom = grid[currentCell.row][currentCell.col + 1]


    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.col === 29 && currentCell.row !== 39) {
    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const right = grid[currentCell.row + 1][currentCell.col];
    const left = grid[currentCell.row - 1][currentCell.col];

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (right && !right.isVisited) {
      neighbors.push(right)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.row === 0 && currentCell.col === 0) {
    const neighbors = [];
    const right = grid[currentCell.row + 1][currentCell.col];
    const bottom = grid[currentCell.row][currentCell.col + 1]

    if (right && !right.isVisited) {
      neighbors.push(right)
    }

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }
  } else if (currentCell.row === 0 && currentCell.col === 29) {
    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const right = grid[currentCell.row + 1][currentCell.col];

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (right && !right.isVisited) {
      neighbors.push(right)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.row === 39 && currentCell.col === 0) {

    const neighbors = [];
    const left = grid[currentCell.row - 1][currentCell.col];
    const bottom = grid[currentCell.row][currentCell.col + 1]

    if (bottom && !bottom.isVisited) {
      neighbors.push(bottom)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }

  } else if (currentCell.row === 39 && currentCell.col === 29) {

    const neighbors = [];
    const top = grid[currentCell.row][currentCell.col - 1];
    const left = grid[currentCell.row - 1][currentCell.col];

    if (top && !top.isVisited) {
      neighbors.push(top)
    }

    if (left && !left.isVisited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      const random = Math.floor(Math.random() * (neighbors.length - 0)) + 0;
      return neighbors[random]
    } else {
      return undefined;
    }
  }
}

const changeCurrentCell = (current, nextCell, grid, setStack, setCurrentCell, stack) => {
  if (nextCell) {
    setTimeout(() => {
      if (current.row - nextCell.row === -1) {
        const newGrid = [...grid];
        const currentCellFromGrid = newGrid[current.row][current.col];
        const next = newGrid[nextCell.row][nextCell.col];
        const currentNode = {
          ...currentCellFromGrid,
          isVisited: true,
          rightWall: false
        }
        const nextNode = {
          ...next,
          isVisited: true,
          leftWall: false
        }
        newGrid[current.row][current.col] = currentNode
        newGrid[nextCell.row][nextCell.col] = nextNode
        // setGrid(newGrid)
        setStack(prev => [...prev, current])
        setCurrentCell(nextNode)
      } else if (current.row - nextCell.row === 1) {
        const newGrid = [...grid];
        const currentCellFromGrid = newGrid[current.row][current.col];
        const next = newGrid[nextCell.row][nextCell.col];
        const currentNode = {
          ...currentCellFromGrid,
          isVisited: true,
          leftWall: false
        }
        const nextNode = {
          ...next,
          isVisited: true,
          rightWall: false
        }
        newGrid[current.row][current.col] = currentNode
        newGrid[nextCell.row][nextCell.col] = nextNode
        setStack(prev => [...prev, current])
        setCurrentCell(nextNode)
      } else if (current.col - nextCell.col === -1) {
        const newGrid = [...grid];
        const currentCellFromGrid = newGrid[current.row][current.col];
        const next = newGrid[nextCell.row][nextCell.col];
        const currentNode = {
          ...currentCellFromGrid,
          isVisited: true,
          bottomWall: false
        }
        const nextNode = {
          ...next,
          isVisited: true,
          topWall: false
        }
        newGrid[current.row][current.col] = currentNode
        newGrid[nextCell.row][nextCell.col] = nextNode
        setStack(prev => [...prev, current])
        setCurrentCell(nextCell)
      } else if (current.col - nextCell.col === 1) {
        const newGrid = [...grid];
        const currentCellFromGrid = newGrid[current.row][current.col];
        const next = newGrid[nextCell.row][nextCell.col];
        const currentNode = {
          ...currentCellFromGrid,
          isVisited: true,
          topWall: false
        }
        const nextNode = {
          ...next,
          isVisited: true,
          bottomWall: false,
        }
        newGrid[current.row][current.col] = currentNode
        newGrid[nextCell.row][nextCell.col] = nextNode
        setStack(prev => [...prev, current])
        setCurrentCell(nextNode)
      }

    }, 10)
  } else if (stack.length > 0) {
    let newStack = [...stack];
    const newGrid = [...grid]
    const first = newStack[stack.length - 1];
    newStack.pop()
    setStack(newStack)
    setCurrentCell(first)
  }
}