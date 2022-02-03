import React, { useEffect, useState } from "react";
import axios from 'axios'
import Tile from "./Tile";

export interface IGame {
  tiles: ITile[];
  isFinished: boolean
  isWon: boolean
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

  const fetchGame = async () => {
    setMessage('');
    const result = await axios.post('https://minesweeper-max.herokuapp.com/game', {
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

  useEffect(() => {
    fetchGame();
  }, []);

  const tileClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    let tileString = (event.target as HTMLDivElement).dataset?.tile
    if (tileString) {
      const tile = JSON.parse(tileString);

      const result = await axios.post('https://minesweeper-max.herokuapp.com/play', {
        position: {
          x: tile.x,
          y: tile.y,
        }
      });

      if (result.data?.error) {
        setMessage(result.data.error);
        return;
      }

      if (result.data.isFinished) setMessage('GAME OVER');
      if (result.data.isWon) setMessage('Congratulations 🥳');

      setGame(result.data);
    }
  }

  return <>
    <button id="new-game-button" onClick={fetchGame}>New game</button>
    <div id="board">
      {game?.tiles.map((tile, idx) => {
        return <Tile tileDef={tile} tileClick={tileClick} numbOfCols={props.colsNumber} key={idx}/>
      })}
    </div>
    <div>{message}</div>
  </>
}

export default Game;
