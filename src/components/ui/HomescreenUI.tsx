import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'
import SettingsModal from './modals/SettingsModal'

const HomescreenUIInner = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PlayButton = styled(GameButton)`
  position: absolute;
  bottom: 40px;
`

const SettingsButton = styled(GameButton)`
  position: fixed;
  top: 20px;
  left: 20px;
`

const HomescreenUI: FunctionComponent = () => {
  const { loadNextMinigame } = gameManager
  const [showSettings, setShowSettings] = useState(false)

  const onSettingsModalClose = () => {
    setShowSettings(false)
  }

  const onSettingsButtonClick = () => {
    setShowSettings(true)
  }

  return (
    <HomescreenUIInner>
      {showSettings && <SettingsModal onClose={onSettingsModalClose} />}
      <SettingsButton onClick={onSettingsButtonClick}>S</SettingsButton>
      <PlayButton onClick={loadNextMinigame}>Wake up</PlayButton>
    </HomescreenUIInner>
  )
}

export default HomescreenUI
