import React, { FunctionComponent } from 'react'
import MinigameToolbar from './games/MinigameToolbar'
import gameManager from '../../game/manager/GameManager'
import MinigameGuideline from './MinigameGuideline'
import minigameManager from '../../game/manager/MinigameManager'
import PauseModal from './modals/PauseModal'
import { observer } from 'mobx-react-lite'
import gameStore from '../../store/GameStore'

const MinigameUI: FunctionComponent = () => {
  const { paused, canPause } = gameStore
  const { minigameGuideline } = gameManager
  const { hasPlayedCurrentMinigame } = minigameManager

  return (
    <div className="minigame-ui">
      <MinigameToolbar />
      {!hasPlayedCurrentMinigame && minigameGuideline && (
        <MinigameGuideline guideline={minigameGuideline} />
      )}
      {canPause && paused && <PauseModal />}
    </div>
  )
}

export default observer(MinigameUI)
