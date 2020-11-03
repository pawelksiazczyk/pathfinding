const chooseOrientation = (width, height) => {
  if(width < height) {
    return "horizontal"
  } else if (height < width) {
    return "vertical"
  } else {
    const random = Math.random();
    return random === 0 ? "horizontal" : "vertical";
  }
}


export const divide = (grid, setGrid, rowStart, rowEnd, colStart, colEnd, orientation) => {
    if (colEnd - colStart <= 1 || rowEnd - rowStart <= 1) {
      return
    }
    const setOrientation = chooseOrientation(rowEnd - rowStart, colEnd - colStart);
    const setNew = setGrid
    if (orientation === "horizontal") {
      const random = Math.floor(Math.random() * (colEnd - colStart) + colStart);
      console.log("horizontal", random)
      if (random !== 30) {
        for (let i = rowStart; i < rowEnd; i++) {
          const currentNode = grid[i][random]
          const node = {
            ...currentNode,
            bottomWall: true,
          }
          grid[i][random] = node;
          setGrid(grid[i][random], "bottom")

        }
        const randomGap = Math.floor(Math.random() * (rowEnd - rowStart) + rowStart);
        const gap = grid[randomGap][random];
        const newGap = {
          ...gap,
          bottomWall: false,
        }
        grid[randomGap][random] = newGap;
        setGrid(grid[randomGap][random], "gap-bottom")

        divide(grid, setNew, rowStart, rowEnd, colStart, random + 1, setOrientation);
        divide(grid, setNew, rowStart, rowEnd, random + 1, colEnd, setOrientation);




      }

    }
    

    else if (orientation === "vertical") {
      const random = Math.floor(Math.random() * (rowEnd - rowStart) + rowStart);
      console.log("vertical", random)
      if (random !== 40) {

        for (let i = colStart; i < colEnd; i++) {
          const currentNode = grid[random][i]
          const node = {
            ...currentNode,
            rightWall: true,
          }
          grid[random][i] = node;
          setGrid(grid[random][i], "right")
        }
        const randomGap = Math.floor(Math.random() * (colEnd - colStart) + colStart);
        const gap = grid[random][randomGap];
        const newGap = {
          ...gap,
          rightWall: false,
        }
        grid[random][randomGap] = newGap;
        setGrid(grid[random][randomGap], "gap-right")

        divide(grid, setNew, rowStart, random + 1, colStart, colEnd, setOrientation);
        divide(grid, setNew, random + 1, rowEnd, colStart, colEnd, setOrientation);


      }
    }

 
    
}
