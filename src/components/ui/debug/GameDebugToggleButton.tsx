import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import {useKeyboardInput} from "../../../utils/hooks";
import {Key} from "ts-key-enum";
import gameDebugStore from "../../../store/GameDebugStore";
import DebugButton from "./DebugButton";
import {GameDebugTheme} from "../../../utils/enums";

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

  return (
    <DebugButton onClick={debug ? hideDebug : showDebug} forceTheme={GameDebugTheme.Light}>
      {debug ? <i className="icon close"/> : <i className="icon debug"/> }
    </DebugButton>
  )
}

export default observer(
  GameDebugToggleButton
)


