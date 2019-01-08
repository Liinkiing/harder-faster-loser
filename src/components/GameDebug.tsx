import * as React from 'react'
import GameDebugStateList from './ui/debug/GameDebugStateList'
import { FunctionComponent } from 'react'
import GameDebugConfigPanel from './ui/debug/GameDebugConfigPanel'

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
      <GameDebugConfigPanel title="Game config" x={10} y={180} />
      <GameDebugStateList title="Game state" x={10} y={10} />
    </div>
  )
}

GameDebug.defaultProps = {
  visible: false,
}

export default GameDebug
