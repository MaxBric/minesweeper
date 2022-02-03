import React from 'react';
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Minesweeper

        <Game rowsNumber={5} colsNumber={5} bombsNumber={5}/>
      </header>
    </div>
  );
}

export default App;
