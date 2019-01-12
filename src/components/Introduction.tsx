import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import gameStore from '../store/GameStore'

interface Props {
  onLaunchGame: () => void
}

const IntroductionInner = styled.div``

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
