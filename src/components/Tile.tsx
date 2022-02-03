import React from "react";

interface ITileProps {
  tileDef: {
    x: number;
    y: number;
    isRevealed: boolean;
    isABomb: boolean;
    numberOfBombsAround?: number;
  },
  tileClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

function Tile(props: ITileProps) {
  return <div className={"Tile"} onClick={props.tileClick} data-tile={JSON.stringify(props.tileDef)}>
    {`${props.tileDef.x} - ${props.tileDef.y} - ${props.tileDef.isABomb}`}
  </div>
}

export default Tile;