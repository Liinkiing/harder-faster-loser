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
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { observer } from 'mobx-react-lite'
import { CirclePicker, ColorResult } from 'react-color'
import Spacer from '../Spacer'
import ValidatableInput from '../ValidatableInput'

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

const MinigameDurationCol = styled.span`
  width: 100px;
  display: inline-block;
  transition: all 0.15s;
`

const GameDebugConfigPanel: FunctionComponent<
  PositionneableProps & TitledProps
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
