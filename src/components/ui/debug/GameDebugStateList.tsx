import * as React from 'react'
import { ChangeEvent, FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'
import { GameState } from '../../../utils/enums'
import DebugContainer from './DebugContainer'
import gameManager from '../../../game/manager/GameManager'
import { scenesKeys } from '../../../utils/constants'

const GameDebugStateList: FunctionComponent = () => {
  const { state, changeState } = gameStore
  const availableStates = Object.keys(GameState).map(
    gameState => GameState[gameState]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value as GameState) {
      case GameState.Splashscreen:
        gameManager.loadSplashscreen()
        break
      case GameState.Homescreen:
        gameManager.loadHomescreen()
        break
      case GameState.Deathscreen:
        gameManager.loadDeathscreen()
        break
      case GameState.Minigame:
        gameManager.loadMinigame(scenesKeys.SpamGame)
        break
      default:
        changeState(e.target.value as GameState)
    }
  }

  return (
    <>
      <DebugContainer x={10} y={10} title="Game state">
        {availableStates.map(availableState => {
          return (
            <label key={availableState} className="game-state-list--item">
              <input
                id={availableState}
                className="radio"
                type="radio"
                name="currentState"
                value={availableState}
                checked={availableState === state}
                onChange={handleInputChange}
              />
              <span>{availableState}</span>
            </label>
          )
        })}
      </DebugContainer>
    </>
  )
}

export default observer(GameDebugStateList)
