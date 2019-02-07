import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import gameManager, { Emitter } from '../../game/manager/GameManager'
import { GameEvents } from '../../utils/enums'
import GameButton from './GameButton'
import CountUp from 'react-countup'

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
  flex-direction: column;
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 40px;
  ${GameButton} {
    position: fixed;
    bottom: 20px;
    font-size: 16px;
  }
`

const PercentData = styled.div`
  display: flex;
`

const DeathscreenUI: FunctionComponent = () => {
  const { loadLeaderboards } = gameManager
  const [showButton, setShowButton] = useState(false)
  const [message, setMessage] = useState(
    <p>
      Toki died <br /> of a<br /> burn out{' '}
    </p>
  )
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, args => {
      setPercent(args.percent)
      setMessage(<p>{args.text}</p>)
      setShowButton(true)
    })
  }, [])

  return (
    <Div className="deathscreen-ui">
      {showButton && (
        <PercentData>
          <CountUp start={0} end={percent} />
          <span>%</span>
        </PercentData>
      )}

      {message}
      {showButton && (
        <GameButton onClick={loadLeaderboards} size="small">
          Leaderboards
        </GameButton>
      )}
    </Div>
  )
}

export default DeathscreenUI
