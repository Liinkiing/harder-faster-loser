import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Emitter } from '../../game/manager/GameManager'
import { GameEvents } from '../../utils/enums'

const Div = styled.div`
  margin: 80px auto 0 auto;
  text-align: center;
  font-size: 30px;
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
