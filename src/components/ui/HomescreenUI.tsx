import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'
import SettingsModal from './modals/SettingsModal'
import { Shaker } from '../../Shaker'

const SettingsButton = styled(GameButton)`
  position: fixed;
  top: 20px;
  left: 20px;
`

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
  ${SettingsButton} {
    padding: 5px;
  }
`

const PlayButton = styled(GameButton)`
  position: absolute;
  bottom: 40px;
`

const HomescreenUI: FunctionComponent = () => {
  const { loadNextMinigame, isDesktop } = gameManager
  const [showSettings, setShowSettings] = useState(false)

  const onPlay = () => {
    gameManager.audio.stopLayeredSounds()
    gameManager.audio.playBg()
    loadNextMinigame()
  }

  const onSettingsModalClose = () => {
    setShowSettings(false)
  }

  const onSettingsButtonClick = () => {
    setShowSettings(true)
  }

  return (
    <HomescreenUIInner>
      {showSettings && <SettingsModal onClose={onSettingsModalClose} />}
      <SettingsButton onClick={onSettingsButtonClick}>
        <img
          alt="Settings"
          src={require('../../assets/images/icons/settings.png')}
        />
      </SettingsButton>
      {(isDesktop || !Shaker.hasDeviceMotion()) && (
        <PlayButton onClick={onPlay}>Wake up</PlayButton>
      )}
    </HomescreenUIInner>
  )
}

export default HomescreenUI
