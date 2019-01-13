import * as React from 'react'
import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import DebugButton from './DebugButton'
import gameStore from '../../../store/GameStore'
import gameManager from '../../../game/manager/GameManager'
import { useKeyboardShortcuts } from '../../../utils/hooks'

const GameDebugToggleSoundsButton: FunctionComponent = () => {
  const {
    settings: { volume },
  } = gameStore
  const {
    audio: { toggleSounds },
  } = gameManager
  useKeyboardShortcuts([
    {
      keys: ['M'],
      action: toggleSounds,
    },
  ])

  return (
    <DebugButton onClick={toggleSounds}>{volume === 0 ? 'U' : 'M'}</DebugButton>
  )
}

export default observer(GameDebugToggleSoundsButton)
