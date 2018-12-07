import React, {FunctionComponent, useEffect} from 'react'
import styled from 'styled-components'
import {observer} from "mobx-react-lite";
import gameManager from "../../game/manager/GameManager";

interface Props {
  color?: string
}

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.color};
  }  
`

const Transition: FunctionComponent<Props> = (props) => {
  const fader = React.createRef<HTMLDivElement>()
  const color = props.color !== undefined ? props.color : Transition.defaultProps!.color
  useEffect(() => {
    if (fader.current) {
      gameManager.gameFader = fader.current
    }
  }, [])

  return (
      <Div color={color} ref={fader} className="transition-fade"/>
  )
}

Transition.defaultProps = {
  color: "black"
}

export default observer(
  Transition
)
