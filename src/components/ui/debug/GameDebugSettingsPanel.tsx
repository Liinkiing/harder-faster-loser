import * as React from 'react'
import { useCallback, ChangeEventHandler, FunctionComponent } from 'react'
import { observer } from 'mobx-react-lite'
import DebugContainer from './DebugContainer'
import { PositionneableProps, TitledProps } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import ValidatableInput from '../ValidatableInput'
import Spacer from '../Spacer'

const GameDebugSettingsPanel: FunctionComponent<
  TitledProps & PositionneableProps
> = props => {
  const {
    changeSettings,
    settings: { volume, vibrations },
  } = gameStore

  const onChangeVibrationsInput = useCallback(
    () => {
      changeSettings({
        vibrations: !vibrations,
      })
    },
    [vibrations]
  )

  const handleOnValidateVolume = useCallback((value: string) => {
    changeSettings({
      volume: Number(value),
    })
  }, [])

  const onChangeVolumeInput: ChangeEventHandler<HTMLInputElement> = evt => {
    changeSettings({
      volume: Number(evt.target.value),
    })
  }

  return (
    <>
      <DebugContainer {...props}>
        <label>
          <span>Volume : </span>
          <ValidatableInput
            value={String(volume)}
            onChange={onChangeVolumeInput}
            onValidate={handleOnValidateVolume}
            className="input"
            type="number"
            step="0.1"
            max={1}
            min={0}
          />
        </label>
        <Spacer />
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={vibrations}
            onChange={onChangeVibrationsInput}
          />
          <span>Vibrations?</span>
        </label>
      </DebugContainer>
    </>
  )
}

export default observer(GameDebugSettingsPanel)
