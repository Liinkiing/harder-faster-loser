import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import gameStore from '../store/GameStore'
import { black, white } from '../utils/colors'
import GameButton from './ui/GameButton'

interface Props {
  onLaunchGame: () => void
}

const IntroductionInner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  color: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${black};
  ${GameButton} {
    margin-top: 20px;
  }
`

const Introduction: FunctionComponent<Props> = props => {
  const { loading } = gameStore
  const { onLaunchGame } = props
  return (
    <IntroductionInner>
      <h1>Harder, Faster, Loser</h1>
      <GameButton disabled={loading} onClick={onLaunchGame}>
        Launch game
      </GameButton>
    </IntroductionInner>
  )
}

export default observer(Introduction)
