import * as React from 'react'
import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import { useKeyboardShortcuts } from '../../../utils/hooks'
import { Key } from 'ts-key-enum'
import gameDebugStore from '../../../store/GameDebugStore'
import DebugButton from './DebugButton'
import { GameDebugTheme } from '../../../utils/enums'

const GameDebugToggleButton: FunctionComponent = () => {
  const { debug, toggleDebug, hideDebug } = gameDebugStore

  useKeyboardShortcuts([
    {
      keys: [Key.Escape],
      action: hideDebug,
    },
    {
      keys: ['D'],
      action: toggleDebug,
    },
  ])

  return (
    <DebugButton onClick={toggleDebug} forceTheme={GameDebugTheme.Light}>
      {debug ? <i className="icon close" /> : <i className="icon debug" />}
    </DebugButton>
  )
}

export default observer(GameDebugToggleButton)
