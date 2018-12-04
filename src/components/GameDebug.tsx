import * as React from 'react';
import GameStateList from "./ui/debug/GameStateList";

const GameDebug = () => {

  return (
    <div id="game" className="game-debug game-ui">
      <h1>Debug interface</h1>
      <GameStateList/>
    </div>
  )
}

export default GameDebug


