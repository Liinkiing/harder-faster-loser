import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { MinigameGuideline as Guideline } from '../../utils/interfaces'
import styled from 'styled-components'
import { darkBlue, pink, yellow } from '../../utils/colors'
import {
  guidelineAppear,
  guidelineContainerAppear,
  guidelineContainerLeaving,
  guidelineLeaving,
} from '../../utils/keyframes'
import gameManager from '../../game/manager/GameManager'
import gameStore from '../../store/GameStore'

interface Props {
  guideline: Guideline
  onLeft?: () => void
  onAppeared?: () => void
}

interface StyledProps {
  isLeaving: boolean
}

const SHOW_DURATION = 2500
const APPEAR_SOUND = 'guideline_appear'
const LEAVE_SOUND = 'guideline_leave'

const MinigameGuidelineOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
  }
`

const GuidelineContainer = styled.div<StyledProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 100%;
  text-align: center;
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: ${darkBlue};
    box-shadow: 0 8px 0 rgba(0, 0, 0, 0.43);
    animation: ${props =>
        props.isLeaving ? guidelineContainerLeaving : guidelineContainerAppear}
      0.5s forwards;
  }
`

const GuidelineTitle = styled.h2<StyledProps>`
  color: ${yellow};
  text-transform: uppercase;
  font-size: 26px;
  margin-bottom: 20px;
  animation: ${props => (props.isLeaving ? guidelineLeaving : guidelineAppear)}
    0.6s forwards;
`

const GuidelineSubtitle = styled.p<StyledProps>`
  color: ${pink};
  line-height: 1.6em;
  animation: ${props => (props.isLeaving ? guidelineLeaving : guidelineAppear)}
    0.6s forwards;
`

const MinigameGuideline: FunctionComponent<Props> = props => {
  const {
    guideline: { title, subtitle },
    onLeft,
    onAppeared,
  } = props
  const [isLeaving, setIsLeaving] = useState(false)
  const [time, setTime] = useState(0)
  const [display, setDisplay] = useState(true)
  const container = useRef<HTMLDivElement>(null)
  useEffect(
    () => {
      const handler = () => {
        setTime(time + 10)
      }
      let interval: undefined | NodeJS.Timeout
      if (time !== -1 && time <= SHOW_DURATION) {
        interval = setInterval(handler, 1)
      }

      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    },
    [time]
  )

  useEffect(() => {
    gameStore.showGuideline()
    gameManager.activeScene!.scene.pause()
    const endHandler = (evt: AnimationEvent) => {
      if (evt.animationName === guidelineAppear.getName()) {
        if (onAppeared) {
          onAppeared()
        }
      }
      if (evt.animationName === guidelineLeaving.getName()) {
        if (onLeft) {
          onLeft()
        }
        gameManager.activeScene!.scene.resume()
        setDisplay(false)
      }
    }
    const startHandler = (evt: AnimationEvent) => {
      if (evt.animationName === guidelineAppear.getName()) {
        gameManager.audio.playSfx(APPEAR_SOUND, {
          volume: 0.15,
          delay: 0.25,
        })
      }
      if (evt.animationName === guidelineLeaving.getName()) {
        gameManager.audio.playSfx(LEAVE_SOUND, {
          volume: 0.15,
          delay: 0.25,
        })
      }
    }
    if (container.current) {
      container.current.addEventListener('animationstart', startHandler)
      container.current.addEventListener('animationend', endHandler)
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('animationstart', startHandler)
        container.current.removeEventListener('animationend', endHandler)
      }
    }
  }, [])

  if (!display) {
    gameStore.hideGuideline()
    return null
  }

  if (time === SHOW_DURATION) {
    setIsLeaving(true)
    setTime(-1)
  }

  return (
    <MinigameGuidelineOverlay>
      <GuidelineContainer ref={container} isLeaving={isLeaving}>
        <GuidelineTitle isLeaving={isLeaving}>{title}</GuidelineTitle>
        <GuidelineSubtitle isLeaving={isLeaving}>{subtitle}</GuidelineSubtitle>
      </GuidelineContainer>
    </MinigameGuidelineOverlay>
  )
}

export default MinigameGuideline
