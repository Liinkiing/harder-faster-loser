import 'phaser'
import * as React from 'react'
import { useResize } from '../utils/hooks'
import GameUI from './ui/GameUI'
import GameDebug from './GameDebug'
import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import GameDebugButtonsToolbar from './ui/debug/GameDebugButtonsToolbar'
import gameDebugStore from '../store/GameDebugStore'
import gameManager from '../game/manager/GameManager'
import gameStore from '../store/GameStore'

const Game: FunctionComponent = () => {
  const { width, height } = useResize()
  const { debug } = gameDebugStore
  const {
    hideUi,
    started,
    config: { dev },
  } = gameStore
  const { paused } = gameDebugStore

  if (gameManager.game.canvas) {
    gameManager.game.canvas.style.transition = 'all 0.15s'
    gameManager.game.resize(width, height)
    gameManager.resizeCamera(width, height)
    gameManager.game.canvas.style.filter = paused
      ? 'blur(20px) grayscale(80%)'
      : null
    gameManager.game.canvas.style.transform = paused ? 'scale(1.2)' : null
  }

  return (
    <div id="game" className="game">
      {started && dev && <GameDebugButtonsToolbar />}
      {started && dev && <GameDebug hide={debug} />}
      {started && !hideUi && <GameUI />}
    </div>
  )
}

export default observer(Game)
