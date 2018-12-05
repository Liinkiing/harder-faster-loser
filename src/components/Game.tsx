import 'phaser'
import * as React from 'react';
import {gameConfig} from "../utils/game";
import {useResize} from "../utils/hooks";
import GameUI from "./ui/GameUI";
import GameDebug from "./GameDebug";
import {FunctionComponent} from "react";
import {observer} from "mobx-react-lite";
import GameDebugButtonsToolbar from "./ui/debug/GameDebugButtonsToolbar";
import gameDebugStore from "../store/GameDebugStore";

const game = new Phaser.Game(gameConfig)

const Game: FunctionComponent = () => {
  const { width, height } = useResize()
  const { debug } = gameDebugStore

  if (game.canvas) {
    game.canvas.width = width
    game.canvas.height = height
    game.canvas.style.width = `${width}px`
    game.canvas.style.height = `${height}px`
  }

  return (
    <div id="game" className="game">
      <GameDebugButtonsToolbar/>
      {debug && <GameDebug/>}
      <GameUI/>
    </div>
  )
}

export default observer(
  Game
)


