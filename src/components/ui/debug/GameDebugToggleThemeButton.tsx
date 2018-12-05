import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import gameDebugStore from "../../../store/GameDebugStore";
import DebugButton from "./DebugButton";

const GameDebugToggleThemeButton: FunctionComponent = () => {
  const { toggleTheme, otherThemeName } = gameDebugStore

  return (
    <DebugButton onClick={toggleTheme}>
      {otherThemeName[0]}
    </DebugButton>
  )
}

export default observer(
  GameDebugToggleThemeButton
)


