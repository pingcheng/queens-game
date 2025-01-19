import { TileHolder, TileState, TileType } from "@/config/game.config";

export function generateGame(size: number): TileHolder[] {
  const tiles: TileHolder[] = Array(size * size).fill({
    type: TileType.Empty,
    state: TileState.Empty,
    color: "white",
  });

  // place queens and group cells
  const queensIndexes = generateRandomNQueens(size);
  const groups = groupCellsWithQueens(size, queensIndexes, 1);

  for (const index of queensIndexes) {
    tiles[index] = {
      type: TileType.Queen,
      state: TileState.Empty,
      color: "white",
    };
  }

  // fill colours
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "magenta",
  ];
  for (const group of groups) {
    group.forEach((index) => {
      tiles[index].color = colors.pop() || "white";
    });
  }

  return tiles;
}

// TODO: from chatgpt but did not work
function generateRandomNQueens(size: number): number[] {
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

  return solve(0) ? board.map((col, row) => row * size + col) : [];
}

// TODO: from chatgpt but did not work
function groupCellsWithQueens(
  size: number,
  queenIndices: number[],
  minCells: number
): number[][] {
  // Create a board representation where each cell has a group ID
  const board = Array(size * size).fill(-1);

  // Convert 1D index to 2D coordinates
  const to2D = (index: number) => ({
    row: Math.floor(index / size),
    col: index % size,
  });

  // Convert 2D coordinates to 1D index
  const to1D = (row: number, col: number) => row * size + col;

  // Mark queens on the board
  queenIndices.forEach((index, queenId) => {
    const { row, col } = to2D(index);
    board[to1D(row, col)] = queenId; // Mark each queen with its own groupId (index of queen)
  });

  // Helper function to perform DFS to group connected cells
  const dfs = (row: number, col: number, groupId: number): number[] => {
    const stack = [{ row, col }];
    const group: number[] = [];

    while (stack.length) {
      const { row, col } = stack.pop()!;
      const index = to1D(row, col);

      if (board[index] !== -1) continue; // Skip if already in a group or is a queen

      board[index] = groupId;
      group.push(index);

      // Check four possible directions (up, down, left, right)
      const directions = [
        { row: row - 1, col },
        { row: row + 1, col },
        { row, col: col - 1 },
        { row, col: col + 1 },
      ];

      for (const { row, col } of directions) {
        if (
          row >= 0 &&
          row < size &&
          col >= 0 &&
          col < size &&
          board[to1D(row, col)] === -1
        ) {
          stack.push({ row, col });
        }
      }
    }

    return group;
  };

  let groupId = queenIndices.length; // Start groupId after all queens are placed
  const groups: number[][] = [];

  // Step 1: Each queen gets its own group (already handled above)
  queenIndices.forEach((queenIndex, queenId) => {
    groups.push([queenIndex]); // Create a separate group for each queen
  });

  // Step 2: Group remaining connected cells
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const index = to1D(row, col);

      // Skip cells that are already grouped or contain a queen
      if (board[index] !== -1) continue;

      const group = dfs(row, col, groupId++);
      // Only include groups with enough cells
      if (group.length >= minCells) {
        groups.push(group);
      }
    }
  }

  return groups;
}
