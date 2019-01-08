import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import gameManager, { Emitter } from '../../../game/manager/GameManager'
import { GameEvents } from '../../../utils/enums'
import gameStore from '../../../store/GameStore'

const ProgressOuter = styled.div`
  width: 100%;
  height: 40px;
  background: white;
`

const ProgressInner = styled.div`
  height: 40px;
  will-change: width;
  background: red;
`

const RemainingTime: FunctionComponent = () => {
  const {
    config: { minigameDuration },
  } = gameStore
  const [remaining, setRemaining] = useState(0)
  const button = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    gameManager.activeScene!.time.addEvent({
      callback: () => {
        if (button.current) {
          button.current.click()
        }
      },
      delay: 16,
      repeat: -1,
    })
  }, [])

  if (remaining >= minigameDuration!) {
    gameManager.activeScene!.time.removeAllEvents()
    Emitter.emit(GameEvents.RemainingTimeOver)
  }

  const onClick = () => {
    setRemaining(remaining + 1)
  }

  const progress = 100 - (remaining / minigameDuration) * 100

  return (
    <ProgressOuter className="progress remaining-time">
      <button
        ref={button}
        onClick={onClick}
        style={{ pointerEvents: 'all', display: 'none' }}
      />
      <ProgressInner
        style={{ width: `${progress}%` }}
        className="progress inner"
      >
        <span style={{ display: 'none' }} aria-hidden={true}>
          {progress}%
        </span>
      </ProgressInner>
    </ProgressOuter>
  )
}

export default RemainingTime
