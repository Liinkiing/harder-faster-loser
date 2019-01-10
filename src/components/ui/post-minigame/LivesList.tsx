import React, { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'
import styled from 'styled-components'
import stress from '../../../assets/sprites/post-minigame/life_1_285_270.png'
import brain from '../../../assets/sprites/post-minigame/life_2_285_270.png'
import heart from '../../../assets/sprites/post-minigame/life_3_285_270.png'
import Spritesheet from '../Spritesheet'

const FRAME_WIDTH = 285
const FRAME_HEIGHT = 270
const FPS = 8

const LivesListInner = styled.ul`
  display: flex;
  flex-direction: column;
  width: ${FRAME_WIDTH / 3}px;
  & li {
    margin-bottom: 20px;
  }
`

const LivesList: FunctionComponent = () => {
  const { lives } = gameStore
  return (
    <LivesListInner>
      <li>
        <Spritesheet
          image={stress}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={8}
          fps={FPS}
        />
      </li>
      <li>
        <Spritesheet
          image={brain}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={20}
          fps={FPS}
        />
      </li>
      <li>
        <Spritesheet
          image={heart}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={9}
          fps={FPS}
        />
      </li>
    </LivesListInner>
  )
}

export default observer(LivesList)
