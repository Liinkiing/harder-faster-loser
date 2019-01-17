import * as React from 'react'
import { FunctionComponent, useCallback, ChangeEventHandler } from 'react'
import DebugContainer from './DebugContainer'
import {
  ForceThemeProps,
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

const GameDebugConfigPanel: FunctionComponent<
  PositionneableProps & TitledProps & HideableProps & ForceThemeProps
> = props => {
  const {
    difficulty,
    setDifficulty,
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

  const handleOnValidate = useCallback((duration: string) => {
    changeConfig({
      minigameDuration: Number(duration),
    })
  }, [])

  const handleOnValidateDifficulty = useCallback((value: string) => {
    setDifficulty(Number(value))
  }, [])

  const onChangeDifficultyInput: ChangeEventHandler<HTMLInputElement> = evt => {
    setDifficulty(Number(evt.target.value))
  }

  const onChangeMinigameDurationInput: ChangeEventHandler<
    HTMLInputElement
  > = evt => {
    changeConfig({
      minigameDuration: Number(evt.target.value),
    })
  }

  return (
    <DebugContainer {...props}>
      <label>
        <span>Difficulty : </span>
        <ValidatableInput
          value={String(difficulty)}
          onChange={onChangeDifficultyInput}
          onValidate={handleOnValidateDifficulty}
          className="input"
          type="number"
          step="1"
          max={20}
          min={1}
        />
      </label>
      <Spacer />
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
      <div
        style={{
          width: '100%',
        }}
      >
        Minigame duration :
        <Spacer size="small" />
        <ValidatableInput
          style={{
            width: '100%',
          }}
          value={String(minigameDuration)}
          onChange={onChangeMinigameDurationInput}
          onValidate={handleOnValidate}
          className="input"
          type="number"
          max={700}
          min={200}
        />
      </div>
    </DebugContainer>
  )
}

export default observer(GameDebugConfigPanel)
