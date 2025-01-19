"use client";

import { TILE_SIZE, TileState } from "@/config/game.config";
import { useMemo } from "react";
import Image from "next/image";
import CrossIcon from "../../../public/icons/cross.svg";
import QueenCrownIcon from "../../../public/icons/queen-crown.svg";
import styles from "./Tile.module.css";

type TileProps = Readonly<{
  index: number;
  state: TileState;
  onClick: (index: number) => void;
  color: string;
}>;

export default function Tile({ index, state, color, onClick }: TileProps) {
  const marker = useMemo(() => {
    if (state === TileState.CROSS) {
      return <Image src={CrossIcon} alt="cross" />;
    }

    if (state === TileState.QUEEN) {
      return <Image src={QueenCrownIcon} alt="queen" />;
    }

    return "";
  }, [state]);

  const handleClick = () => {
    onClick(index);
  };

  return (
    <div
      className={`${styles.tile} ${styles[color]}`}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
      }}
      onClick={handleClick}
    >
      {marker}
    </div>
  );
}
