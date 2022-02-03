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
  numbOfCols: number,
}

function Tile(props: ITileProps) {
  const TileWidth = {
    width: `calc(${100 / props.numbOfCols}% - 2px)`,
  }

  return <div className={`Tile ${props.tileDef.isRevealed ? "Tile-revealed" : ""}`}
              style={TileWidth}
              onClick={props.tileClick}
              data-tile={JSON.stringify(props.tileDef)}>
    {`${props.tileDef.isRevealed && props.tileDef.isABomb ? '💣' : props.tileDef.numberOfBombsAround ? props.tileDef.numberOfBombsAround : ''}`}
  </div>
}

export default Tile;