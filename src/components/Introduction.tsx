import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import gameStore from '../store/GameStore'
import { green, white } from '../utils/colors'

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
  background: ${green};
`

const Introduction: FunctionComponent<Props> = props => {
  const { loading } = gameStore
  const { onLaunchGame } = props
  return (
    <IntroductionInner>
      <h1>Harder, Faster, Looser</h1>
      <button disabled={loading} onClick={onLaunchGame}>
        Launch game
      </button>
    </IntroductionInner>
  )
}

export default observer(Introduction)
