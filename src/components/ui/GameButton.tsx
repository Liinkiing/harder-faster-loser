import * as React from 'react'
import { FunctionComponent, HTMLAttributes, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { white, yellow } from '../../utils/colors'
import { boxShadow } from '../../utils/css'
import gameManager from '../../game/manager/GameManager'

type Props = HTMLAttributes<HTMLButtonElement> &
  Partial<Pick<HTMLButtonElement, 'disabled'>>

const GameButton: FunctionComponent<Props> = props => {
  const { onClick } = props
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = evt => {
    if (gameManager.audio) {
      gameManager.audio.playSfx('explosion')
    }
    if (onClick) {
      onClick(evt)
    }
  }

  return (
    <button {...props} onClick={onClickHandler}>
      {props.children}
    </button>
  )
}

export default styled(GameButton)`
  background: ${yellow};
  border: none;
  color: ${white};
  padding: 15px 30px;
  text-align: center;
  width: fit-content;
  user-select: none;
  pointer-events: all;
  ${boxShadow};
  &:hover,
  :active {
    cursor: pointer;
    background: ${white};
    color: ${yellow};
  }
  &:disabled {
    filter: grayscale(100%);
    cursor: not-allowed;
  }
`
