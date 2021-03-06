import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import gameStore from '../store/GameStore'
import { green, white } from '../utils/colors'
import BigButton from './ui/BigButton'

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
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${green};
  p {
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 4px;
    line-height: 34px;
    @media screen and (max-width: 320px) {
      font-size: 14px;
      line-height: 20px;
    }
  }
  ${BigButton} {
    margin-top: 80px;
  }
`

const Introduction: FunctionComponent<Props> = props => {
  const { loading } = gameStore
  const { onLaunchGame } = props
  return (
    <IntroductionInner>
      <p>
        Hey loser, we want you to live the best interactive experience. This is
        why you have to press this button >
      </p>
      <BigButton disabled={loading} onClick={onLaunchGame} />
    </IntroductionInner>
  )
}

export default observer(Introduction)
