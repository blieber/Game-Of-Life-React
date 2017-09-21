function getNeighborsCount(row, col, board) {
    // According to wikipedia here are the rules
    // (They spell neighbor as "neighbour" though so that was edited below, of course)
    // Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    //
    // We can simplify this a bit:
    // <= 2 dead
    // >= 5 dead
    // ==3 alive 
    // ==4 alive if self is alive else dead


}

function update(board) {

    new_board = 

    for(let row = 0; row < board.length; row++) {
        for(let col = 0; j < board[row].length; col++) {



            let neighborsCount = getNeighborsCount(row, col, board);

            new_board[] neighborsCount === 3 || 
              (neighborsCount == 4 && board[row][col]) {

            }

        }
    }
}

