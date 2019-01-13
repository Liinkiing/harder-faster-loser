import * as React from 'react'
import { FunctionComponent } from 'react'
import GameDebugToggleButton from './GameDebugToggleButton'
import GameDebugToggleThemeButton from './GameDebugToggleThemeButton'
import GameDebugTogglePauseButton from './GameDebugTogglePauseButton'
import { useKeyboardShortcuts } from '../../../utils/hooks'
import gameDebugStore from '../../../store/GameDebugStore'
import { observer } from 'mobx-react-lite'
import GameDebugToggleSoundsButton from './GameDebugToggleSoundsButton'

const GameDebugButtonsToolbar: FunctionComponent = () => {
  const { toggleDebugToolbar, debugToolbar } = gameDebugStore

  useKeyboardShortcuts([
    {
      keys: ['K'],
      action: toggleDebugToolbar,
    },
  ])

  if (!debugToolbar) {
    return null
  }

  return (
    <div className="game-debug-buttons-toolbar">
      <GameDebugToggleSoundsButton />
      <GameDebugTogglePauseButton />
      <GameDebugToggleThemeButton />
      <GameDebugToggleButton />
    </div>
  )
}

export default observer(GameDebugButtonsToolbar)
