import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import RemainingTime from './RemainingTime'
import { minigameToolbarHeight } from '../../../utils/constants'
import GamePauseButton from './GamePauseButton'
import { black, hexToRgba } from '../../../utils/colors'

const Div = styled.div`
  background: ${hexToRgba(black, 0.5)};
  height: ${minigameToolbarHeight}px;
  top: 0;
  position: absolute;
  pointer-events: all;
  z-index: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
`

const MinigameToolbar: FunctionComponent = props => {
  return (
    <Div {...props} className="minigame-toolbar">
      <RemainingTime />
      <GamePauseButton />
    </Div>
  )
}

export default MinigameToolbar
