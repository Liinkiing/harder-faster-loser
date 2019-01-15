import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import {
  black,
  green,
  lightGray,
  lightRed,
  red,
  white,
} from '../../../utils/colors'
import PauseIcon from '../icons/PauseIcon'
import gameStore from '../../../store/GameStore'
import { observer } from 'mobx-react-lite'
import gameManager from '../../../game/manager/GameManager'
import { border, boxShadow } from '../../../utils/css'

interface StyledProps {
  paused: boolean
}

const Button = styled.button<StyledProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: ${green};
  outline: none;
  ${border};
  color: ${white};
  line-height: 100px;
  height: 70px;
  ${boxShadow};
  user-select: all;
  &:hover:not(:disabled) {
    cursor: pointer;
    background: ${white};
    & .pause-icon .bar {
      background: ${green};
    }
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 1;
    background: ${lightGray};
  }
  ${props =>
    props.paused
      ? `
    background: ${white};
    & .pause-icon .bar {
      background: ${green};
    }
  `
      : ``}
`

const GamePauseButton: FunctionComponent = () => {
  const {
    paused,
    config: { suspended },
  } = gameStore
  const { togglePause } = gameManager

  return (
    <Button disabled={suspended} paused={paused} onClick={togglePause}>
      <PauseIcon />
    </Button>
  )
}

export default observer(GamePauseButton)
