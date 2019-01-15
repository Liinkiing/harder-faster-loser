import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import ModalsContainer from '../ModalsContainer'
import pauseBg from '../../../assets/sprites/pause/pause_bg.png'
import cigaretteSpritesheet from '../../../assets/sprites/pause/cigarette_150_110.png'
import mugSpritesheet from '../../../assets/sprites/pause/mug_85_115.png'
import styled from 'styled-components'
import Spritesheet from '../Spritesheet'
import GameButton from '../GameButton'
import gameManager from '../../../game/manager/GameManager'
import { slideInUp } from '../../../utils/keyframes'
import { observer } from 'mobx-react-lite'
import { WARNING_SIGN_SIZE } from './WarningSign'
import WarningSize from './WarningSign'

const PauseModalContainer = styled.div`
  display: flex;
  animation: ${slideInUp} 0.3s forwards;
  flex-direction: column;
  position: relative;
  width: 80%;
  height: 80%;
  max-width: 340px;
  max-height: 518px;
  background: url(${pauseBg}) no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  padding: ${WARNING_SIGN_SIZE / 2 + 30}px 40px 40px;

  ${GameButton} {
    text-transform: uppercase;
    margin: 20px auto;
    font-size: 20px;
  }
`

const SpritesheetContainer = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
`

const PauseModal: FunctionComponent = props => {
  const { resume } = gameManager
  let PauseAnimation = (
    <Spritesheet
      image={cigaretteSpritesheet}
      widthFrame={150}
      heightFrame={110}
      steps={15}
      fps={4}
    />
  )
  if (Math.random() >= 0.5) {
    PauseAnimation = (
      <Spritesheet
        image={mugSpritesheet}
        widthFrame={85}
        heightFrame={155}
        steps={5}
        fps={4}
      />
    )
  }
  useEffect(
    () => () => {
      gameManager.audio.playSfx('explosion')
      gameManager.resume()
    },
    []
  )

  return (
    <ModalsContainer>
      <PauseModalContainer>
        <WarningSize />
        <SpritesheetContainer>{PauseAnimation}</SpritesheetContainer>
        <GameButton onClick={resume}>Resume</GameButton>
        <GameButton>Quit</GameButton>
      </PauseModalContainer>
    </ModalsContainer>
  )
}

export default observer(PauseModal)
