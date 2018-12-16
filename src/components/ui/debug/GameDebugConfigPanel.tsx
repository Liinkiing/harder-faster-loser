import * as React from 'react'
import { FunctionComponent, useCallback, useState } from 'react'
import DebugContainer from './DebugContainer'
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { CirclePicker, ColorResult } from 'react-color'
import Spacer from '../Spacer'

interface FadeInputProps {
  onFadeChange?: (fade: boolean) => void
}

const FadeInput = observer((props: FadeInputProps) => {
  const {
    config: { fade },
    changeConfig,
  } = gameStore
  const { onFadeChange } = props
  const handleFadeChange = useCallback(
    () => {
      changeConfig({
        fade: !fade,
      })
      if (onFadeChange) {
        onFadeChange(!fade)
      }
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

const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#000000',
  '#ffffff',
]

const GameDebugConfigPanel: FunctionComponent<
  PositionneableProps & TitledProps
> = props => {
  const { changeConfig } = gameStore
  const [fade, setFade] = useState(true)
  const handleFadeColorChange = useCallback((color: ColorResult) => {
    changeConfig({
      fadeColor: color.hex,
    })
  }, [])

  return (
    <DebugContainer {...props}>
      <FadeInput onFadeChange={setFade} />
      {fade && (
        <>
          <Spacer />
          <p>Fade color</p>
          <Spacer size="small" />
          <CirclePicker
            colors={colors}
            onChangeComplete={handleFadeColorChange}
          />
        </>
      )}
    </DebugContainer>
  )
}

export default GameDebugConfigPanel
