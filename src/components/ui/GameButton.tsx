import * as React from 'react'
import { FunctionComponent, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { white, yellow } from '../../utils/colors'
import { boxShadow } from '../../utils/css'

type Props = HTMLAttributes<HTMLButtonElement>

const GameButton: FunctionComponent<Props> = props => (
  <button {...props}>{props.children}</button>
)

export default styled(GameButton)`
  background: ${yellow};
  border: none;
  color: ${white};
  padding: 15px 30px;
  text-align: center;
  width: fit-content;
  ${boxShadow};
  &:hover,
  :active {
    cursor: pointer;
    background: ${white};
    color: ${yellow};
  }
`
