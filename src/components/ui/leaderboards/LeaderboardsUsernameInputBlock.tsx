import * as React from 'react'
import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

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
  &:after {
    content: '';
    position: absolute;
    width: 80%;
    height: 8px;
    background: currentColor;
    bottom: 10px;
  }
`

const LeaderboardsUsernameInputBlock: FunctionComponent = props => {
  const [char, setChar] = useState(0)
  const handleClick = () => {
    setChar((char + 1) % AVAILABLE_CHARS.length)
  }

  return (
    <LeaderboardsUsernameInputBlockInner onClick={handleClick}>
      {AVAILABLE_CHARS[char]}
    </LeaderboardsUsernameInputBlockInner>
  )
}

export default LeaderboardsUsernameInputBlock
