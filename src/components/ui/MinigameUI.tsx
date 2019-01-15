import React, { FunctionComponent } from 'react'
import MinigameToolbar from './games/MinigameToolbar'
import gameManager from '../../game/manager/GameManager'
import MinigameGuideline from './MinigameGuideline'
import minigameManager from '../../game/manager/MinigameManager'
import PauseModal from './modals/PauseModal'

const MinigameUI: FunctionComponent = () => {
  const { minigameGuideline } = gameManager
  const { hasPlayedCurrentMinigame } = minigameManager

  return (
    <div className="minigame-ui">
      <MinigameToolbar />
      {!hasPlayedCurrentMinigame && (
        <MinigameGuideline guideline={minigameGuideline} />
      )}
      <PauseModal />
    </div>
  )
}

export default MinigameUI
