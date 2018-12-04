import * as React from 'react';
import GameDebugStateList from "./ui/debug/GameDebugStateList";
import {FunctionComponent} from "react";

const GameDebug: FunctionComponent = () => {

  return (
    <div className="game-debug game-ui">
      <h1>Debug interface</h1>
      <GameDebugStateList/>
    </div>
  )
}

export default GameDebug


