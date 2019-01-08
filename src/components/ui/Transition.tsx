import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import gameManager from '../../game/manager/GameManager'
import gameStore from '../../store/GameStore'

const Div = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  &::after {
    content: '';
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.color};
  }
`

interface Props {
  color?: string
}

const Transition: FunctionComponent<Props> = () => {
  const fader = React.createRef<HTMLDivElement>()
  const {
    config: { fadeColor },
  } = gameStore
  useEffect(() => {
    if (fader.current) {
      gameManager.gameFader = fader.current
    }
  }, [])

  return <Div color={fadeColor} ref={fader} className="transition-fade" />
}

export default observer(Transition)
