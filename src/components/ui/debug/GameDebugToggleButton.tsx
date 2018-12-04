import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../store/GameStore";

const GameDebugToggleButton: FunctionComponent = () => {
  const {debug, showDebug, hideDebug} = gameStore

  return debug ?
    (
      <div onClick={hideDebug} className="game-debug-toggle-button">
        <i className="icon close"/>
      </div>
    ) :
    (
      <div onClick={showDebug} className="game-debug-toggle-button">
        <i className="icon debug"/>
      </div>
    )
}

export default observer(
  GameDebugToggleButton
)


