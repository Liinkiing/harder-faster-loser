import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import RemainingTime from './RemainingTime'

const Div = styled.div`
  background: rgb(55, 63, 71);
  height: 84px;
  top: 0;
  position: absolute;
  z-index: 0;
  width: 100%;
  display: flex;
  align-items: center;
`

const MinigameToolbar: FunctionComponent = props => {
  return (
    <Div {...props} className="minigame-toolbar">
      <RemainingTime />
    </Div>
  )
}

export default MinigameToolbar
