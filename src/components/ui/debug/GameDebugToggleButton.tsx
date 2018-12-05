import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import {useKeyboardInput} from "../../../utils/hooks";
import {Key} from "ts-key-enum";
import gameDebugStore from "../../../store/GameDebugStore";

const GameDebugToggleButton: FunctionComponent = () => {
  const {debug, showDebug, hideDebug} = gameDebugStore

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
      <button onClick={hideDebug} className="debug-button game-debug-toggle-button">
        <i className="icon close"/>
      </button>
    ) :
    (
      <button onClick={showDebug} className="debug-button game-debug-toggle-button">
        <i className="icon debug"/>
      </button>
    )
}

export default observer(
  GameDebugToggleButton
)


