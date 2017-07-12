function Grid(row, col, spacing) { //row,col,spacing
    var count = 0;
    var grid = {}
    var size = ((window.innerWidth - (row + 1) * spacing) / row);
    var doubleSize = size * 2 + spacing
    for (var j = 0; j < col; j++) {
      grid[j]=new Array();
        for (var i = 0; i < row; i++) {
            // for (var j = 0; j < col; j++) {
            // if (count < 1)
            grid[j].push({
                spacing: spacing,
                size: size,
                doubleSize: doubleSize,
                x: spacing * (i + 1) + size * i, //40 +60
                y: spacing * (j + 1) + size * j,
            })
            count += 1;
            // }
        }
    }
    // console.log(grid)
    return {
      grid:grid,
      size:size,
      doubleSize:doubleSize,
      bodyHeight:col*size+(col+1)*spacing
    };
}
