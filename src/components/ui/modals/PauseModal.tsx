import * as React from 'react'
import { FunctionComponent } from 'react'
import ModalsContainer from '../ModalsContainer'
import pauseBg from '../../../assets/sprites/pause/pause_bg.png'
import cigaretteSpritesheet from '../../../assets/sprites/pause/cigarette_450_330.png'
import mugSpritesheet from '../../../assets/sprites/pause/mug_255_465.png'
import warningSign from '../../../assets/sprites/pause/warning_sign.png'
import styled from 'styled-components'
import Spritesheet from '../Spritesheet'

const WARNING_SIGN_SIZE = 120

const PauseModalContainer = styled.div`
  display: flex;
  position: relative;
  width: 80%;
  height: 80%;
  background: url(${pauseBg}) no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  padding: ${WARNING_SIGN_SIZE / 2 + 30}px 40px 40px;
  &:after {
    position: absolute;
    content: '';
    left: calc(50% - ${WARNING_SIGN_SIZE / 2}px);
    top: -${WARNING_SIGN_SIZE / 2 - 10}px;
    width: ${WARNING_SIGN_SIZE}px;
    height: ${WARNING_SIGN_SIZE}px;
    background: url(${warningSign}) no-repeat center;
    background-size: contain;
  }
`

const PauseModal: FunctionComponent = props => {
  return (
    <ModalsContainer>
      <PauseModalContainer>salut</PauseModalContainer>
    </ModalsContainer>
  )
}

export default PauseModal
