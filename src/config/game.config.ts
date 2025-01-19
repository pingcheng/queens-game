export const TILE_SIZE = 64;

export enum TileType {
  Empty,
  Queen,
}

export enum TileColor {
  White = "white",
}

export enum TileState {
  Empty,
  CROSS,
  QUEEN,
}

export type TileHolder = {
  type: TileType;
  state: TileState;
  color: string;
};

export const NEXT_TILE_STATE: Record<TileState, TileState> = {
  [TileState.Empty]: TileState.CROSS,
  [TileState.CROSS]: TileState.QUEEN,
  [TileState.QUEEN]: TileState.Empty,
};
