import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import gameDebugStore from "../../../store/GameDebugStore";

const GameDebugToggleThemeButton: FunctionComponent = () => {
  const {theme, setTheme} = gameDebugStore
  const classNames = ['debug-button']
  const isDarkTheme = theme === "dark";
  if (isDarkTheme) {
    classNames.push('is-dark')
  }
  const handleClick = () => {
    setTheme(isDarkTheme ? "light" : "dark")
  }
  return (
    <button className={classNames.join(' ')} onClick={handleClick}>
      {isDarkTheme ? "L" : "D"}
    </button>
  )
}

export default observer(
  GameDebugToggleThemeButton
)


