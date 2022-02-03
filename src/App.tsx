import React from 'react';
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Minesweeper

        <Game rowsNumber={8} colsNumber={8} bombsNumber={15}/>
      </header>
    </div>
  );
}

export default App;
