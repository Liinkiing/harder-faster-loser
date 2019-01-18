import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import leaderboardsStore from '../../../store/LeaderboardsStore'
import { pink, red } from '../../../utils/colors'
import gameManager from '../../../game/manager/GameManager'

interface Props {
  readonly usernameIndex: number
}

const AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')

const LeaderboardsUsernameInputBlockInner = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  pointer-events: all;
  &:hover,
  :active {
    color: ${pink};
  }
  &:after {
    content: '';
    position: absolute;
    width: 80%;
    height: 8px;
    background: currentColor;
    bottom: 10px;
    left: 10px;
  }
`

const LeaderboardsUsernameInputBlock: FunctionComponent<Props> = props => {
  const { usernameIndex } = props
  const { changeUsername } = leaderboardsStore
  const [char, setChar] = useState(0)

  const handleClick = () => {
    setChar((char + 1) % AVAILABLE_CHARS.length)
    gameManager.audio.playSfx('explosion')
  }

  useEffect(
    () => {
      changeUsername(usernameIndex, AVAILABLE_CHARS[char])
    },
    [char]
  )

  return (
    <LeaderboardsUsernameInputBlockInner onClick={handleClick}>
      {AVAILABLE_CHARS[char]}
    </LeaderboardsUsernameInputBlockInner>
  )
}

export default LeaderboardsUsernameInputBlock
