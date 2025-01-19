import { TileState, TileType } from "@/config/game.config";

export function generateGame(size: number) {
  const tiles = Array(size * size).fill({
    type: TileType.Empty,
    state: TileState.Empty,
  });

  const queensIndexes = new Set<number>(generateRandomNQueens(size));

  console.log(queensIndexes);

  for (const index of queensIndexes) {
    tiles[index] = {
      type: TileType.Queen,
      state: TileState.Empty,
    };
  }

  return tiles;
}

function generateRandomNQueens(size: number): number[] | null {
  const board: number[] = new Array(size).fill(-1);

  // Helper function to check if the position is safe
  const isSafe = (row: number, col: number): boolean => {
    for (let i = 0; i < row; i++) {
      const prevCol = board[i];
      // Check if there's another queen in the same column or diagonals
      if (prevCol === col || Math.abs(prevCol - col) === Math.abs(i - row)) {
        return false;
      }
    }
    return true;
  };

  // Helper function to shuffle the order of columns
  const shuffleColumns = (cols: number[]): number[] => {
    for (let i = cols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cols[i], cols[j]] = [cols[j], cols[i]];
    }
    return cols;
  };

  // Recursive function to solve the board
  const solve = (row: number): boolean => {
    if (row === size) return true; // All queens placed successfully

    const shuffledColumns = shuffleColumns([...Array(size).keys()]); // Get shuffled columns

    for (const col of shuffledColumns) {
      if (isSafe(row, col)) {
        board[row] = col; // Place queen in this column of the current row
        if (solve(row + 1)) {
          return true;
        }
        board[row] = -1; // Backtrack if no solution
      }
    }
    return false;
  };

  return solve(0) ? board.map((col, row) => row * size + col) : null;
}
