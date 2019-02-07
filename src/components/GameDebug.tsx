import * as React from 'react'
import GameDebugStateList from './ui/debug/GameDebugStateList'
import { FunctionComponent } from 'react'
import GameDebugConfigPanel from './ui/debug/GameDebugConfigPanel'
import { HideableProps } from '../utils/interfaces'
import GameDebugSettingsPanel from './ui/debug/GameDebugSettingsPanel'

const GameDebug: FunctionComponent<HideableProps> = props => {
  const { hide } = props

  return (
    <div
      style={{ display: hide ? 'block' : 'none' }}
      className="game-debug game-ui"
    >
      <h1>Debug interface</h1>
      <GameDebugConfigPanel title="Game config" x={10} y={220} />
      <GameDebugStateList title="Game state" x={10} y={10} />
      <GameDebugSettingsPanel title="Game settings" x={10} y={220} />
    </div>
  )
}

GameDebug.defaultProps = {
  hide: false,
}

export default GameDebug
