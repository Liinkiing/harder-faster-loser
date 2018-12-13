import * as React from 'react'
import { FunctionComponent, useCallback } from 'react'
import DebugContainer from './DebugContainer'
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { CirclePicker, ColorResult } from 'react-color'
import Spacer from '../Spacer'

const FadeInput = observer(() => {
  const {
    config: { fade },
    changeConfig,
  } = gameStore
  const handleFadeChange = useCallback(
    () => {
      changeConfig({
        fade: !fade,
      })
    },
    [fade]
  )

  return (
    <label>
      <input
        type="checkbox"
        className="checkbox"
        checked={fade}
        onChange={handleFadeChange}
      />
      <span>Fade?</span>
    </label>
  )
})

const GameDebugConfigPanel: FunctionComponent<
  PositionneableProps & TitledProps
> = props => {
  const { changeConfig } = gameStore
  const handleFadeColorChange = useCallback((color: ColorResult) => {
    changeConfig({
      fadeColor: color.hex,
    })
  }, [])

  return (
    <DebugContainer {...props}>
      <FadeInput />
      <Spacer />
      <CirclePicker onChangeComplete={handleFadeColorChange} />
    </DebugContainer>
  )
}

export default GameDebugConfigPanel
