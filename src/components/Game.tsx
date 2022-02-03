import React, { useEffect, useState } from "react";
import axios from 'axios'
import Tile from "./Tile";

export interface IGame {
  tiles: ITile[];
  isFinished: boolean
  gameParams: IGameParams
}

export interface IGameParams {
  colsNumber: number;
  rowsNumber: number;
  bombsNumber: number;
}

export interface ITile {
  x: number;
  y: number;
  isRevealed: boolean;
  isABomb: boolean;
  numberOfBombsAround?: number;
}

function Game(props: IGameParams) {
  const [ game, setGame ] = useState<IGame>();
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      const result = await axios.post('http://localhost:3001/game', {
        gameParams: {
          colsNumber: props.colsNumber,
          rowsNumber: props.rowsNumber,
          bombsNumber: props.bombsNumber,
        }
      })
      if (result.data?.error) {
        setMessage(result.data.error);
        return;
      }

      setGame(result.data);
    }

    fetchGame();
  }, []);

  const tileClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    let tileString = (event.target as HTMLDivElement).dataset?.tile
    if (tileString) {
      const tile = JSON.parse(tileString);

      console.log(tile)

      const result = await axios.post('http://localhost:3001/play', {
        position: {
          x: tile.x,
          y: tile.y,
        }
      });

      console.log(result.data);

      if (result.data?.error) {
        setMessage(result.data.error);
        return;
      }

      if (result.data.isFinished) setMessage('GAME OVER');

      setGame(result.data);
    }
  }

  return <div id="Game">
    <div>{message}</div>
    {game?.tiles.map((tile, idx) => {
      return <Tile tileDef={tile} tileClick={tileClick} key={idx}/>
    })}
  </div>
}

export default Game;
