"use client";

import { NEXT_TILE_STATE, TileHolder, TileState } from "@/config/game.config";
import { useEffect, useMemo, useState } from "react";
import Tile from "../Tile/Tile";
import { generateGame } from "@/common/gameGenerator";
import { isWinningGame } from "@/common/isWinningGame";

type GameBoardProps = Readonly<{
  size: number;
  onWin?: () => void;
}>;

export default function GameBoard({ size, onWin }: GameBoardProps) {
  const [tiles, setTiles] = useState<TileHolder[]>();

  useEffect(() => {
    setTiles(generateGame(size));
  }, [size]);

  useEffect(() => {
    if (!tiles) return;
    if (!onWin) return;

    if (isWinningGame(tiles)) onWin();
  }, [tiles, onWin]);

  const renderedTiles = useMemo(() => {
    if (!tiles) {
      return "Initializing...";
    }

    const handleTileClick = (index: number) => {
      const nextState: TileState = NEXT_TILE_STATE[tiles[index].state];

      setTiles(
        tiles.map((t, i) => (i === index ? { ...t, state: nextState } : t))
      );
    };

    return tiles.map((tile, index) => {
      return (
        <Tile
          key={index}
          index={index}
          state={tile.state}
          color={tile.color}
          onClick={handleTileClick}
        />
      );
    });
  }, [tiles]);

  return (
    <div
      className="grid bg-white border-2 border-black"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
    >
      {renderedTiles}
    </div>
  );
}
