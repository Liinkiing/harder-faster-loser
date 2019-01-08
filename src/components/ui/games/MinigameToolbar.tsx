import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import RemainingTime from './RemainingTime'
import { minigameToolbarHeight } from '../../../utils/constants'

const Div = styled.div`
  background: rgb(55, 63, 71);
  height: ${minigameToolbarHeight}px;
  top: 0;
  position: absolute;
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
    </Div>
  )
}

export default MinigameToolbar
