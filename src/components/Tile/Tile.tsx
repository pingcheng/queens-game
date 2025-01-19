"use client";

import { TILE_SIZE, TileState } from "@/config/game.config";
import { useMemo } from "react";

type TileProps = Readonly<{
  index: number;
  state: TileState;
  onClick: (index: number) => void;
  color: string;
}>;

export default function Tile({ index, state, color, onClick }: TileProps) {
  const marker = useMemo(() => {
    if (state === TileState.CROSS) {
      return "X";
    }

    if (state === TileState.QUEEN) {
      return "Q";
    }

    return "";
  }, [state]);

  const handleClick = () => {
    onClick(index);
  };

  return (
    <div
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        border: "1px solid black",
        cursor: "pointer",
        backgroundColor: color,
      }}
      onClick={handleClick}
    >
      {marker}
    </div>
  );
}
