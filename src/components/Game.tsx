import 'phaser'
import * as React from 'react';
import {useResize} from "../utils/hooks";
import GameUI from "./ui/GameUI";
import GameDebug from "./GameDebug";
import {FunctionComponent} from "react";
import {observer} from "mobx-react-lite";
import GameDebugButtonsToolbar from "./ui/debug/GameDebugButtonsToolbar";
import gameDebugStore from "../store/GameDebugStore";
import gameManager from "../game/manager/GameManager";

const Game: FunctionComponent = () => {
  const { width, height } = useResize()
  const { debug } = gameDebugStore

  if (gameManager.game.canvas) {
    gameManager.game.canvas.width = width
    gameManager.game.canvas.height = height
    gameManager.game.canvas.style.width = `${width}px`
    gameManager.game.canvas.style.height = `${height}px`
  }

  return (
    <div id="game" className="game">
      <GameDebugButtonsToolbar/>
      <GameDebug visible={debug}/>
      <GameUI/>
    </div>
  )
}

export default observer(
  Game
)


