import React, { FunctionComponent, useState } from 'react'
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

  Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, () => {
    setMessage(
      <p>
        {' '}
        Like Toki, <br /> 3000 people <br />
        die each year from burnout in France
      </p>
    )
  })

  return <Div className="deathscreen-ui">{message}</Div>
}

export default DeathscreenUI
