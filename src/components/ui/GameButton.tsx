import * as React from 'react'
import { FunctionComponent, HTMLAttributes, MouseEventHandler } from 'react'
import styled from 'styled-components'
import { white, yellow } from '../../utils/colors'
import { boxShadow } from '../../utils/css'
import gameManager from '../../game/manager/GameManager'

type Props = HTMLAttributes<HTMLButtonElement> &
  Partial<Pick<HTMLButtonElement, 'disabled'>> & {
    size?: 'small' | 'medium' | 'large'
  }

const GameButton: FunctionComponent<Props> = props => {
  const { onClick } = props
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = evt => {
    if (gameManager.audio) {
      gameManager.audio.playSfx('explosion')
    }
    gameManager.vibrate(30)
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

GameButton.defaultProps = {
  size: 'small',
}

export default styled(GameButton)`
  background: ${yellow};
  border: none;
  color: ${white};
  text-align: center;
  width: -moz-max-content;
  width: -webkit-max-content;
  width: intrinsic;
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
  padding: ${(props: Props) => {
    switch (props.size) {
      case 'small':
        return '15px 30px'
      case 'medium':
        return '25px 45px'
      case 'large':
        return '40px 65px'
    }
    return '15px 30px'
  }};
`
