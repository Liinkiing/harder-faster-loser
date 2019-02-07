import * as React from 'react'
import { FunctionComponent, HTMLAttributes } from 'react'
import spritesheet from '../../assets/sprites/btn_red.png'
import styled, { css } from 'styled-components'
import gameManager from '../../game/manager/GameManager'
import { MouseEventHandler } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean
  scale?: number
}

const BigButtonInner = styled.button<Props>`
  width: 31px;
  height: 33px;
  outline: none;
  border: none;
  image-rendering: pixelated;
  background: url(${spritesheet});
  background-position-y: 0;
  ${({ scale }: Props) =>
    css`
      transform: scale(${scale});
    `};
  &:not(:disabled):active,
  &:not(:disabled):hover {
    background-position-y: 33px;
  }
  &:disabled {
    filter: grayscale(100%);
  }
`

const BigButton: FunctionComponent<Props> = props => {
  const { onClick } = props

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = evt => {
    gameManager.vibrate(30)
    if (gameManager.audio) {
      gameManager.audio.playSfx('explosion')
    }
    if (onClick) {
      onClick(evt)
    }
  }

  return (
    <BigButtonInner {...props} onClick={onClickHandler}>
      {props.children}
    </BigButtonInner>
  )
}

BigButton.defaultProps = {
  disabled: false,
  scale: 3,
}

export default styled(BigButton)``
