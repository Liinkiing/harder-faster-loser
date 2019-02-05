import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Emitter } from '../../game/manager/GameManager'
import { GameEvents } from '../../utils/enums'

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 40px;
`

const DeathscreenUI: FunctionComponent = () => {
  const [message, setMessage] = useState(
    <p>
      Toki died <br /> of a<br /> burn out{' '}
    </p>
  )

  useEffect(() => {
    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, args => {
      setMessage(<p>{args.text}</p>)
    })
  }, [])

  return <Div className="deathscreen-ui">{message}</Div>
}

export default DeathscreenUI
