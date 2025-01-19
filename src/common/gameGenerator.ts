import { TileState, TileType } from "@/config/game.config";

export function generateGame(size: number) {
  const tiles = Array(size * size).fill({
    type: TileType.Empty,
    state: TileState.Empty,
  });

  const queensIndexes = new Set<number>(generateRandomNQueens(size));

  for (const index of queensIndexes) {
    tiles[index] = {
      type: TileType.Empty,
      state: TileState.QUEEN,
    };
  }

  return tiles;
}

function generateRandomNQueens(size: number): number[] {
  /**
   * Generate a valid N-Queens placement for a given board size.
   * Ensures no two queens are in the same row, column, or diagonal,
   * with added randomness by shuffling column and row orders.
   *
   * @param size - The size of the board (NxN).
   * @returns An array of cell indices representing queen positions
   *          in a flattened NxN board.
   */
  const placement: number[] = Array(size).fill(-1);
  const columns = Array.from({ length: size }, (_, i) => i);

  function isValidPosition(col: number, row: number): boolean {
    for (let prevCol = 0; prevCol < col; prevCol++) {
      const prevRow = placement[prevCol];
      if (
        prevRow === row ||
        Math.abs(prevRow - row) === Math.abs(prevCol - col)
      ) {
        return false; // Same row or diagonal
      }
    }
    return true;
  }

  function solve(colIndex: number): boolean {
    if (colIndex === size) return true; // All queens placed

    const shuffledColumns = [...columns];
    for (let i = shuffledColumns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledColumns[i], shuffledColumns[j]] = [
        shuffledColumns[j],
        shuffledColumns[i],
      ]; // Shuffle columns
    }

    for (const col of shuffledColumns) {
      const shuffledRows = Array.from({ length: size }, (_, i) => i);
      for (let i = shuffledRows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledRows[i], shuffledRows[j]] = [shuffledRows[j], shuffledRows[i]]; // Shuffle rows
      }

      for (const row of shuffledRows) {
        if (placement[col] === -1 && isValidPosition(col, row)) {
          placement[col] = row;
          if (solve(colIndex + 1)) return true;
          placement[col] = -1; // Backtrack
        }
      }
    }

    return false;
  }

  solve(0);

  // Convert column-row placement to flattened board indices
  return placement.map((row, col) => row * size + col);
}
