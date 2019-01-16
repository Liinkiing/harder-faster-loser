import React, { FunctionComponent, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../store/GameStore'
import { GameState } from '../../utils/enums'
import HomescreenUI from './HomescreenUI'
import SplashscreenUI from './SplashscreenUI'
import MinigameUI from './MinigameUI'
import PostMinigameUI from './PostMinigameUI'
import DeathscreenUI from './DeathscreenUI'
import Transition from './Transition'
import gameManager from '../../game/manager/GameManager'
import gameDebugStore from '../../store/GameDebugStore'
import LeaderboardsUI from './LeaderboardsUI'

const GameUI: FunctionComponent = () => {
  const { state, uiKey } = gameStore
  const { paused } = gameDebugStore
  const classNames = ['game-ui']
  const gameUI = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (gameUI.current) {
      gameManager.gameUI = gameUI.current
    }
  }, [])

  let UIComponent = SplashscreenUI

  switch (state) {
    case GameState.Splashscreen:
      UIComponent = SplashscreenUI
      break
    case GameState.Homescreen:
      UIComponent = HomescreenUI
      break
    case GameState.Minigame:
      UIComponent = MinigameUI
      break
    case GameState.PostMinigame:
      UIComponent = PostMinigameUI
      break
    case GameState.Deathscreen:
      UIComponent = DeathscreenUI
      break
    case GameState.Leaderboards:
      UIComponent = LeaderboardsUI
      break
  }

  if (paused) {
    classNames.push('paused')
  }

  return (
    <div ref={gameUI} className={classNames.join(' ')}>
      <Transition />
      {gameManager.activeScene !== undefined && <UIComponent key={uiKey} />}
    </div>
  )
}

export default observer(GameUI)
