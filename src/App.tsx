import React from 'react';
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Minesweeper

        <Game rowsNumber={10} colsNumber={10} bombsNumber={20}/>
      </header>
    </div>
  );
}

export default App;
