import * as React from 'react';
import {FunctionComponent} from 'react';
import GameDebugToggleButton from "./GameDebugToggleButton";
import GameDebugToggleThemeButton from "./GameDebugToggleThemeButton";

const GameDebugButtonsToolbar: FunctionComponent = () => (
  <div className="game-debug-buttons-toolbar">
    <GameDebugToggleThemeButton/>
    <GameDebugToggleButton/>
  </div>
)

export default GameDebugButtonsToolbar

