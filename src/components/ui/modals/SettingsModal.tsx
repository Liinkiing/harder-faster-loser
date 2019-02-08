import * as React from 'react'
import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from 'react'
import ModalsContainer from '../ModalsContainer'
import pauseBg from '../../../assets/sprites/pause/pause_bg.png'
import closeIcon from '../../../assets/images/icons/btn_close.png'
import styled, { css } from 'styled-components'
import { slideInUp } from '../../../utils/keyframes'
import { observer } from 'mobx-react-lite'
import { black, hexToRgba, pink, white } from '../../../utils/colors'
import gameStore from '../../../store/GameStore'
import Spacer from '../Spacer'
import gameManager from '../../../game/manager/GameManager'
import TeamProfilePicture from './TeamProfilePicture'

const SettingsModalContainer = styled.div`
  display: flex;
  animation: ${slideInUp} 0.3s forwards;
  flex-direction: column;
  position: relative;
  width: 80%;
  height: 80%;
  max-width: 340px;
  max-height: 518px;
  background: url(${pauseBg}) no-repeat center;
  background-size: contain;
  image-rendering: pixelated;
  padding: 40px;
  color: ${black};
  & h3 {
    text-align: center;
    margin-top: 10px;
  }
`

const ModalInner = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: ${hexToRgba(black, 0.5)};
  }
`

const THUMB_STYLE = css`
  -webkit-appearance: none;
  border: 4px solid ${black};
  height: 36px;
  width: 20px;
  transform: translateY(8px);
  background: ${pink};
  cursor: pointer;
  margin-top: -18px;
  box-shadow: 4px 0 0 ${hexToRgba(black, 0.2)} inset;
`

const Heading = styled.h2`
  margin: 30px 0;
  text-transform: uppercase;
  color: ${white};
  text-align: center;
`

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: -24px;
  outline: none;
  border: none;
  background: url(${closeIcon});
  background-size: contain;
  height: 64px;
  width: 64px;
  &:hover {
    cursor: pointer;
  }
`

const SoundPicto = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`

const Row = styled.div<{ inverse?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props =>
    props.inverse
      ? css`
          flex-direction: row-reverse;
        `
      : ''};
`

Row.defaultProps = {
  inverse: false,
}

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  padding: 0;
  font: inherit;
  outline: none;
  color: ${pink};
  background: ${white};
  height: 24px;
  border: 4px solid ${black};
  cursor: pointer;
  &::-webkit-slider-runnable-track,
  ::-moz-range-track,
  ::-ms-track {
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: transparent;
  }
  &::-webkit-slider-thumb {
    ${THUMB_STYLE}
  }
  &::-ms-thumb {
    ${THUMB_STYLE}
  }
  &::-moz-range-thumb {
    ${THUMB_STYLE}
  }
  &::-ms-tooltip {
    display: none;
  }
  &::-ms-fill-upper,
  ::-ms-fill-upper {
    background: transparent;
  }
`

interface Props {
  onClose: () => void
}

const SettingsModal: FunctionComponent<Props> = props => {
  const {
    settings: { vibrations, volume },
    changeSettings,
  } = gameStore
  const { canVibrate } = gameManager
  const { onClose } = props

  const onVolumeChange: ChangeEventHandler<HTMLInputElement> = evt => {
    changeSettings({
      volume: Number(evt.target.value),
    })
  }

  const onCloseButtonClick = () => {
    if (gameManager.audio) {
      gameManager.audio.playSfx('explosion')
    }
    gameManager.vibrate(30)
    onClose()
  }

  const onChangeVibrationsInput = useCallback(
    () => {
      changeSettings({
        vibrations: !vibrations,
      })
    },
    [vibrations]
  )

  return (
    <ModalsContainer>
      <SettingsModalContainer>
        <CloseButton onClick={onCloseButtonClick} />
        <ModalInner>
          <Heading>Settings</Heading>
          <Spacer />
          <Row>
            <SoundPicto
              src={require('../../../assets/images/icons/picto_son.png')}
              alt="Sound picto"
            />
            <VolumeSlider
              type="range"
              min={0}
              value={String(volume)}
              onChange={onVolumeChange}
              step={0.1}
              max={1}
              name="volume"
            />
          </Row>
          <Spacer size="medium" />
          {canVibrate && (
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={vibrations}
                onChange={onChangeVibrationsInput}
              />
              <span>Vibrations?</span>
            </label>
          )}
          <Heading>Team</Heading>
          <h3>Programming</h3>
          <TeamProfilePicture
            picture={require('../../../assets/images/icons/team/robin.png')}
            name="Robin M"
            alt="Robin Minervini"
          />
          <TeamProfilePicture
            picture={require('../../../assets/images/icons/team/thibault.png')}
            name="Thibault C"
            alt="Thibault Callemyn"
          />
          <TeamProfilePicture
            picture={require('../../../assets/images/icons/team/omar.png')}
            name="Omar J"
            alt="Omar Jbara"
          />
          <h3>Artwork</h3>
          <TeamProfilePicture
            picture={require('../../../assets/images/icons/team/anastasiia.png')}
            name="Anastasiia G"
            alt="Anastasiia Gulenko"
          />
          <TeamProfilePicture
            picture={require('../../../assets/images/icons/team/mathilde.png')}
            name="Mathilde H"
            alt="Mathilde Hérard"
          />
        </ModalInner>
      </SettingsModalContainer>
    </ModalsContainer>
  )
}

export default observer(SettingsModal)
