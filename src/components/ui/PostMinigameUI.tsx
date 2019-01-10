import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import gameStore from '../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { gameBackgroundColorToCss } from '../../utils/functions'

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
`

const PostMinigameUI: FunctionComponent = () => {
  const {
    config: { backgroundColor },
  } = gameStore
  return (
    <PostMinigameUIInner
      backgroundColor={gameBackgroundColorToCss(backgroundColor)}
    >
      <h1>Je suis l'ui du postmini game</h1>
    </PostMinigameUIInner>
  )
}

export default observer(PostMinigameUI)
