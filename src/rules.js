// TODO - look into the best docstring format to use for js/react

// Determine if cell at index row,col should be alive after update.
// cells is a 2D matrix of booleans
function cellUpdatesToAlive(row, col, cells) {
    // According to wikipedia here are the rules:
    //                  ^https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
    // (They spell neighbor as "neighbour" though so that was edited below, of course)
    //
    // Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    //
    // If we include the count of a cell with it's neighbors this can be restated as:
    // count <= 2 --> dead
    // count >= 5 --> dead
    // count == 3 --> alive 
    // count == 4 --> alive if self is alive else dead

    let count = 0
    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, cells.size()[0] - 1); i++) {
        for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, cells.size()[1] - 1); j++) {
            if (cells.get([i, j])) {
                count++;
            }
        }
    }

    return count === 3 || (count === 4 && cells.get([row, col]));
}

// cells is a 2D matrix of booleans
export default function getNextGeneration(cells) {

    // Create matrix where we will update next generation
    // We can clone existing matrix as a starting place so
    // we have the corrct dimenions.
    let updatedCells = cells.clone();

    for(let row = 0; row < cells.size()[0]; row++) {
        for(let col = 0; col < cells.size()[1]; col++) {
            let alive = cellUpdatesToAlive(row, col, cells);
            updatedCells.set([row, col], alive);
        }
    }

    return updatedCells;
}

