import React, { FunctionComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import CountUp from 'react-countup'
import gameStore from '../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { gameBackgroundColorToCss } from '../../utils/functions'
import LivesContainer from './post-minigame/LivesList'
import { black } from '../../utils/colors'

interface StyledProps {
  backgroundColor?: string
}

const PostMinigameUIInner = styled.div<StyledProps>`
  background: ${(props: StyledProps) => props.backgroundColor};
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

const Score = styled.h2`
  margin-bottom: 40px;
  font-size: 36px;
  color: ${black};
`

const PostMinigameUI: FunctionComponent = () => {
  const {
    score: { previous, current },
    config: { backgroundColor },
  } = gameStore

  return (
    <PostMinigameUIInner
      backgroundColor={gameBackgroundColorToCss(backgroundColor)}
    >
      <Score>
        <CountUp start={previous} end={current} />
      </Score>
      <LivesContainer />
    </PostMinigameUIInner>
  )
}

export default observer(PostMinigameUI)
