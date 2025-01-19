import { TileHolder, TileState, TileType } from "@/config/game.config";

export function isWinningGame(tiles: TileHolder[]) {
  for (const tile of tiles) {
    if (tile.state === TileState.QUEEN && tile.type !== TileType.Queen) {
      return false;
    }
  }

  return true;
}
