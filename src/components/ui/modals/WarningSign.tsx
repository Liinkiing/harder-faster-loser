import * as React from 'react'
import styled from 'styled-components'
import { FunctionComponent } from 'react'
import { useInterval } from '../../../utils/hooks'
import gameStore from '../../../store/GameStore'
import warningSign from '../../../assets/sprites/pause/warning_sign.png'
import { observer } from 'mobx-react-lite'

export const WARNING_SIGN_SIZE = 120

const WarningSignInner = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  content: '';
  left: calc(50% - ${WARNING_SIGN_SIZE / 2}px);
  top: -3%;
  width: ${WARNING_SIGN_SIZE}px;
  height: ${WARNING_SIGN_SIZE}px;
  background: url(${warningSign}) no-repeat center;
  background-size: contain;
  @media screen and (min-width: 340px) {
    top: -11%;
  }
`

const RemainingTime = styled.h2`
  text-align: center;
  font-size: 42px;
`

const WarningSign: FunctionComponent = props => {
  const {
    decreasePauseRemaining,
    config: { remainingPause },
  } = gameStore

  useInterval(() => {
    decreasePauseRemaining()
  }, 16)

  return (
    <WarningSignInner>
      <RemainingTime>{remainingPause.toFixed(0)}</RemainingTime>
    </WarningSignInner>
  )
}

export default observer(WarningSign)
