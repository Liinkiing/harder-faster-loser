import React, {useEffect} from 'react'
import styled from 'styled-components'
import {observer} from "mobx-react-lite";
import gameManager from "../../game/manager/GameManager";

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
    background: black;
  }  
`

const Transition = () => {
  const fader = React.createRef<HTMLDivElement>()

  useEffect(() => {
    if (fader.current) {
      gameManager.gameFader = fader.current
    }
  }, [])

  return (
      <Div ref={fader} className="transition-fade"/>
  )
}
export default observer(
  Transition
)
