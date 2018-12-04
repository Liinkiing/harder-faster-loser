import * as React from 'react';
import GameDebugStateList from "./ui/debug/GameDebugStateList";
import GameDebugCloseButton from "./ui/debug/GameDebugCloseButton";

const GameDebug = () => {

  return (
    <div className="game-debug game-ui">
      <h1>Debug interface</h1>
      <GameDebugStateList/>
      <GameDebugCloseButton/>
    </div>
  )
}

export default GameDebug


