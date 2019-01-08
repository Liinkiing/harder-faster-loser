import * as React from 'react'
import { ChangeEvent, FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'
import DebugContainer from './DebugContainer'
import gameManager from '../../../game/manager/GameManager'
import { minigameSuffix } from '../../../utils/constants'
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'

const GameDebugMinigamePicker: FunctionComponent<
  TitledProps & PositionneableProps
> = props => {
  const { transitionning } = gameStore

  const minigames = gameManager.game.scene.scenes
    .filter(scene => scene.scene.key.includes(minigameSuffix))
    .map(scene => scene.scene.key)

  console.log(minigames)
  const handleMinigameChange = (e: ChangeEvent<HTMLInputElement>) => {
    gameManager.loadMinigame(e.target.value)
  }

  return (
    <>
      <DebugContainer disabled={transitionning} {...props}>
        {minigames.map(minigame => {
          return (
            <label key={minigame} className="game-state-list--item">
              <input
                id={minigame}
                className="radio"
                type="radio"
                name="currentMinigame"
                value={minigame}
                checked={
                  gameManager.activeScene
                    ? minigame === gameManager.activeScene.scene.key
                    : false
                }
                onChange={handleMinigameChange}
              />
              <span>{minigame}</span>
            </label>
          )
        })}
      </DebugContainer>
    </>
  )
}

export default observer(GameDebugMinigamePicker)
