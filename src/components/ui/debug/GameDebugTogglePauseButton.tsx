import * as React from 'react';
import {FunctionComponent} from 'react';
import {observer} from "mobx-react-lite";
import DebugButton from "./DebugButton";
import PauseIcon from "../icons/PauseIcon";
import {GameDebugTheme} from "../../../utils/enums";
import gameStore from "../../../store/GameStore";
import PlayIcon from "../icons/PlayIcon";
import gameManager from "../../../game/manager/GameManager";
import {useKeyboardShortcuts} from "../../../utils/hooks";

const GameDebugTogglePauseButton: FunctionComponent = () => {
  const { paused } = gameStore
  const { togglePause } = gameManager

  useKeyboardShortcuts([
    {
      keys: ["P"],
      action: togglePause
    }
  ])

  return (
    <DebugButton onClick={togglePause}>
      {theme =>
        !paused && <PauseIcon color={theme === GameDebugTheme.Light ? "black" : "white"}/> ||
        paused && <PlayIcon color={theme === GameDebugTheme.Light ? "black" : "white"}/>
      }
    </DebugButton>
  )
}


export default observer(
  GameDebugTogglePauseButton
)


