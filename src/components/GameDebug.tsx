import * as React from 'react'
import GameDebugStateList from './ui/debug/GameDebugStateList'
import { FunctionComponent } from 'react'

interface Props {
  visible?: boolean
}

const GameDebug: FunctionComponent<Props> = props => {
  const { visible } = props

  return (
    <div
      style={{ display: visible ? 'block' : 'none' }}
      className="game-debug game-ui"
    >
      <h1>Debug interface</h1>
      <GameDebugStateList />
    </div>
  )
}

GameDebug.defaultProps = {
  visible: false,
}

export default GameDebug
