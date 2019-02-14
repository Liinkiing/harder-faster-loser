import * as React from 'react'
import { FunctionComponent, useCallback, useState } from 'react'
import styled from 'styled-components'
import gameStore from '../../store/GameStore'
import { observer } from 'mobx-react-lite'

const SoundPictoInner = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`

const SoundPicto: FunctionComponent = () => {
  const {
    muted,
    changeSettings,
    settings: { volume },
  } = gameStore
  const [savedVolume, setSavedVolume] = useState(volume)
  const onClickHandler = useCallback(
    () => {
      if (muted) {
        changeSettings({
          volume: savedVolume,
        })
      } else {
        setSavedVolume(volume)
        changeSettings({
          volume: 0,
        })
      }
    },
    [volume, savedVolume]
  )

  return (
    <SoundPictoInner
      onClick={onClickHandler}
      src={
        muted
          ? require('../../assets/images/icons/picto_no_sound.png')
          : require('../../assets/images/icons/picto_son.png')
      }
      alt="Sound picto"
    />
  )
}

export default observer(SoundPicto)
