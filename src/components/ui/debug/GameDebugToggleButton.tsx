import * as React from 'react'
import { FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import { useKeyboardShortcuts } from '../../../utils/hooks'
import { Key } from 'ts-key-enum'
import gameDebugStore from '../../../store/GameDebugStore'
import DebugButton from './DebugButton'
import { GameDebugTheme } from '../../../utils/enums'
import styled from 'styled-components'
import debugIcon from '../../../assets/images/icons/debug.png'

const GameDebugToggleButtonIcon = styled.i`
  background: url(${debugIcon}) no-repeat;
  height: 50px;
  width: 50px;
`

const GameDebugToggleButton: FunctionComponent = () => {
  const { debug, toggleDebug, hideDebug } = gameDebugStore
  console.log(process.env.PUBLIC_URL)
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
      {debug ? <i className="icon close" /> : <GameDebugToggleButtonIcon />}
    </DebugButton>
  )
}

export default observer(GameDebugToggleButton)
