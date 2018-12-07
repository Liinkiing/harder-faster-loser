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

const GameUI: FunctionComponent = () => {
  const { state } = gameStore
  const gameUI = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gameUI.current) {
      gameManager.gameUI = gameUI.current
    }
  }, [])

  let UIComponent = <SplashscreenUI />

  switch (state) {
    case GameState.Splashscreen:
      UIComponent = <SplashscreenUI />
      break
    case GameState.Homescreen:
      UIComponent = <HomescreenUI />
      break
    case GameState.Minigame:
      UIComponent = <MinigameUI />
      break
    case GameState.PostMinigame:
      UIComponent = <PostMinigameUI />
      break
    case GameState.Deathscreen:
      UIComponent = <DeathscreenUI />
      break
  }

  return (
    <div ref={gameUI} className="game-ui">
      <Transition />
      {gameManager.activeScene !== undefined && UIComponent}
    </div>
  )
}

export default observer(GameUI)
