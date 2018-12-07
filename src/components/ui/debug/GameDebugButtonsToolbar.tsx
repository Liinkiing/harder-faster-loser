import * as React from 'react';
import {FunctionComponent} from 'react';
import GameDebugToggleButton from "./GameDebugToggleButton";
import GameDebugToggleThemeButton from "./GameDebugToggleThemeButton";
import GameDebugTogglePauseButton from "./GameDebugTogglePauseButton";

const GameDebugButtonsToolbar: FunctionComponent = () => (
  <div className="game-debug-buttons-toolbar">
    <GameDebugTogglePauseButton/>
    <GameDebugToggleThemeButton />
    <GameDebugToggleButton />
  </div>
)

export default GameDebugButtonsToolbar
