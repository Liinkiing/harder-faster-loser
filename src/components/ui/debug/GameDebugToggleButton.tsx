import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../store/GameStore";
import {useKeyboardInput} from "../../../utils/hooks";
import {Key} from "ts-key-enum";

const GameDebugToggleButton: FunctionComponent = () => {
  const {debug, showDebug, hideDebug} = gameStore

  useKeyboardInput(e => {
    switch (e.key) {
      case Key.Escape:
        hideDebug();
        break;
      case "D":
      case "d":
        showDebug()
        break;
    }
  })

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


