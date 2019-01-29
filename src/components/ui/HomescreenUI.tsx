import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'

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
  ${GameButton} {
    position: absolute;
    bottom: 40px;
  }
`

const HomescreenUI: FunctionComponent = () => {
  const { loadTutorialScreen } = gameManager
  return (
    <HomescreenUIInner>
      <GameButton onClick={loadTutorialScreen}>Wake up</GameButton>
    </HomescreenUIInner>
  )
}

export default HomescreenUI
