import * as React from 'react'
import { ChangeEvent, FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'
import { GameState } from '../../../utils/enums'
import DebugContainer from './DebugContainer'
import gameManager from '../../../game/manager/GameManager'
import { scenesKeys } from '../../../utils/constants'
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'
import GameDebugMinigamePicker from './GameDebugMinigamePicker'

const GameDebugStateList: FunctionComponent<
  TitledProps & PositionneableProps
> = props => {
  const { state, transitionning } = gameStore
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
        gameManager.loadMinigame(scenesKeys.SpamMinigame)
        break
      default:
        gameManager.startScene(e.target.value as GameState)
    }
  }

  return (
    <>
      <DebugContainer disabled={transitionning} {...props}>
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
      <GameDebugMinigamePicker
        hide={state && state !== GameState.Minigame}
        title="Minigame picker"
        x={630}
      />
    </>
  )
}

export default observer(GameDebugStateList)
