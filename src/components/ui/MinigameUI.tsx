import React, { FunctionComponent } from 'react'
import MinigameToolbar from './games/MinigameToolbar'
import gameManager from '../../game/manager/GameManager'
import MinigameGuideline from './MinigameGuideline'

const MinigameUI: FunctionComponent = () => {
  const { minigameGuideline } = gameManager

  return (
    <div className="minigame-ui">
      <MinigameToolbar />
      <MinigameGuideline guideline={minigameGuideline} />
    </div>
  )
}

export default MinigameUI
