import React, { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'
import styled from 'styled-components'
import stress from '../../../assets/sprites/post-minigame/life_1_285_270.png'
import brain from '../../../assets/sprites/post-minigame/life_2_285_270.png'
import heart from '../../../assets/sprites/post-minigame/life_3_285_270.png'
import Spritesheet from '../Spritesheet'

const FRAME_WIDTH = 95
const FRAME_HEIGHT = 90
const FPS = 8

const LivesListInner = styled.ul`
  display: flex;
  flex-direction: column;
  & li {
    margin-bottom: 20px;
  }
`

const LivesList: FunctionComponent = () => {
  const {
    hasLoosedBrain,
    hasLoosedHeart,
    hasStress,
    hasJustLoosedBrain,
    hasJustLoosedHeart,
    hasJustStress,
  } = gameStore
  return (
    <LivesListInner>
      <li>
        <Spritesheet
          image={stress}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={8}
          autoplay={hasJustStress}
          startAt={hasStress && !hasJustStress ? 8 : 0}
          fps={FPS}
          repeat={0}
        />
      </li>
      <li>
        <Spritesheet
          image={brain}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={20}
          autoplay={hasJustLoosedBrain}
          startAt={hasLoosedBrain && !hasJustLoosedBrain ? 20 : 0}
          fps={FPS}
          repeat={0}
        />
      </li>
      <li>
        <Spritesheet
          image={heart}
          widthFrame={FRAME_WIDTH}
          heightFrame={FRAME_HEIGHT}
          steps={9}
          autoplay={hasJustLoosedHeart}
          startAt={hasLoosedHeart && !hasJustLoosedHeart ? 9 : 0}
          fps={FPS}
          repeat={0}
        />
      </li>
    </LivesListInner>
  )
}

export default observer(LivesList)
