import { TileHolder, TileState, TileType } from "@/config/game.config";

export function isWinningGame(tiles: TileHolder[]) {
  const queenTiles = tiles.filter((tile) => tile.type === TileType.Queen);
  const queenMarks = tiles.filter((tile) => tile.state === TileState.QUEEN);

  if (queenTiles.length !== queenMarks.length) {
    return false;
  }

  for (const markedTile of queenMarks) {
    if (markedTile.type !== TileType.Queen) {
      return false;
    }
  }

  return true;
}
