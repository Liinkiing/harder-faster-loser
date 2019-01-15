import * as React from 'react'
import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import DebugButton from './DebugButton'
import PauseIcon from '../icons/PauseIcon'
import { GameDebugTheme } from '../../../utils/enums'
import PlayIcon from '../icons/PlayIcon'
import gameManager from '../../../game/manager/GameManager'
import { useKeyboardShortcuts } from '../../../utils/hooks'
import gameDebugStore from '../../../store/GameDebugStore'

const GameDebugTogglePauseButton: FunctionComponent = () => {
  const { paused } = gameDebugStore
  const { toggleDebugPause } = gameManager

  useKeyboardShortcuts([
    {
      keys: ['P'],
      action: toggleDebugPause,
    },
  ])

  return (
    <DebugButton onClick={toggleDebugPause}>
      {theme =>
        (!paused && (
          <PauseIcon
            color={theme === GameDebugTheme.Light ? 'black' : 'white'}
          />
        )) ||
        (paused && (
          <PlayIcon
            color={theme === GameDebugTheme.Light ? 'black' : 'white'}
          />
        ))
      }
    </DebugButton>
  )
}

export default observer(GameDebugTogglePauseButton)
