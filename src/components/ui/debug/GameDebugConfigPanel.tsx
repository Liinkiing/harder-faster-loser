import * as React from 'react'
import styled from 'styled-components'
import {
  KeyboardEvent,
  FunctionComponent,
  useCallback,
  useState,
  useRef,
} from 'react'
import DebugContainer from './DebugContainer'
import {
  HideableProps,
  PositionneableProps,
  TitledProps,
} from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { CirclePicker, ColorResult } from 'react-color'
import Spacer from '../Spacer'
import ValidatableInput from '../ValidatableInput'
import colors from '../../../utils/colors'

const MinigameDurationCol = styled.span`
  width: 100px;
  display: inline-block;
  transition: all 0.15s;
`

const GameDebugConfigPanel: FunctionComponent<
  PositionneableProps & TitledProps & HideableProps
> = props => {
  const {
    config: { fade, minigameDuration },
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

  const handleFadeColorChange = useCallback((color: ColorResult) => {
    changeConfig({
      fadeColor: color.hex,
    })
  }, [])
  const handleGameBackgroundColorChange = useCallback((color: ColorResult) => {
    changeConfig({
      backgroundColor: { ...color.rgb, a: 1 },
    })
  }, [])

  const handleOnValidate = useCallback(
    (duration: string) => {
      changeConfig({
        minigameDuration: Number(duration),
      })
    },
    [minigameDuration]
  )

  return (
    <DebugContainer {...props}>
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={fade}
          onChange={handleFadeChange}
        />
        <span>Fade?</span>
      </label>
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
      <Spacer />
      <p>Game background color</p>
      <Spacer size="small" />
      <CirclePicker
        colors={colors}
        onChangeComplete={handleGameBackgroundColorChange}
      />
      <Spacer />
      <p>
        Minigame duration :
        <MinigameDurationCol>
          <ValidatableInput
            defaultValue={String(minigameDuration)}
            onValidate={handleOnValidate}
            className="input"
            type="number"
            max={700}
            min={200}
          />
        </MinigameDurationCol>
      </p>
    </DebugContainer>
  )
}

export default observer(GameDebugConfigPanel)
