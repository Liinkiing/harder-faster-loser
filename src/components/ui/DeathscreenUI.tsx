import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import gameManager, { Emitter } from '../../game/manager/GameManager'
import { GameEvents } from '../../utils/enums'
import GameButton from './GameButton'
import CountUp from 'react-countup'
import { lightGray, white } from '../../utils/colors'

const Div = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ContainerMessage = styled.div`
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
  font-size: 26px;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 1.5em;
  padding: 0 40px;
  p {
    max-width: 1280px;
  }
  ${GameButton} {
    position: fixed;
    bottom: 20px;
    font-size: 16px;
  }
`

const PercentData = styled.div`
  display: flex;
`

const DeathTime = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: calc(50% + 17px);
  color: ${lightGray};
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
  const [deathTime, setDeathTime] = useState('15.02.19')
  const [fontColor, setFontColor] = useState(lightGray)

  useEffect(() => {
    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, args => {
      setPercent(args.percent)
      setMessage(<p>{args.text}</p>)
      setShowButton(true)
    })

    Emitter.on(GameEvents.DeathscreenThunderOn, () => {
      setFontColor(white)
    })

    Emitter.on(GameEvents.DeathscreenThunderOff, () => {
      setFontColor(lightGray)
    })

    const newDate = new Date()
    let day = newDate.getDate().toString()
    let month = newDate.getMonth().toString()
    let year = newDate.getFullYear().toString()
    year = year.slice(-2)

    if (day.length === 1) {
      day = '0' + day
    }
    if (month.length === 1) {
      month = '0' + month
    }

    const deathDate = [day, month, year].join('.')
    setDeathTime(deathDate)
  }, [])

  return (
    <Div className="deathscreen-ui">
      <DeathTime>{deathTime}</DeathTime>
      <ContainerMessage>
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
      </ContainerMessage>
    </Div>
  )
}

export default DeathscreenUI
