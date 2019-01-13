import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { MinigameGuideline as Guideline } from '../../utils/interfaces'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import {
  guidelineAppear,
  guidelineContainerAppear,
  guidelineContainerLeaving,
  guidelineLeaving,
} from '../../utils/keyframes'
import { wait } from '../../utils/functions'
import gameManager from '../../game/manager/GameManager'

interface Props {
  guideline: Guideline
  onLeft?: () => void
  onAppeared?: () => void
}

interface StyledProps {
  isLeaving: boolean
}

const SHOW_DURATION = 2000
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
  width: 100%;
  height: 200px;
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: ${black};
    box-shadow: 0 8px 0 rgba(0, 0, 0, 0.43);
    animation: ${props =>
        props.isLeaving ? guidelineContainerLeaving : guidelineContainerAppear}
      0.3s;
  }
`

const GuidelineTitle = styled.h2<StyledProps>`
  text-transform: uppercase;
  font-size: 26px;
  margin-bottom: 20px;
  animation: ${props => (props.isLeaving ? guidelineLeaving : guidelineAppear)}
    0.4s;
`

const GuidelineSubtitle = styled.p<StyledProps>`
  animation: ${props => (props.isLeaving ? guidelineLeaving : guidelineAppear)}
    0.4s;
`

const MinigameGuideline: FunctionComponent<Props> = props => {
  const {
    guideline: { title, subtitle },
    onLeft,
    onAppeared,
  } = props
  const [isLeaving, setIsLeaving] = useState(false)
  const [display, setDisplay] = useState(true)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gameManager.activeScene!.scene.pause()
    const handler = (evt: AnimationEvent) => {
      if (evt.animationName === guidelineContainerAppear.getName()) {
        if (onAppeared) {
          onAppeared()
        }
        gameManager.audio.playSfx(APPEAR_SOUND, {
          volume: 0.15,
        })
        wait(SHOW_DURATION).then(() => {
          gameManager.audio.playSfx(LEAVE_SOUND, {
            volume: 0.15,
          })
          setIsLeaving(true)
        })
      }
      if (evt.animationName === guidelineContainerLeaving.getName()) {
        if (onLeft) {
          onLeft()
        }
        gameManager.activeScene!.scene.resume()
        setDisplay(false)
      }
    }
    if (container.current) {
      container.current.addEventListener('animationend', handler)
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('animationend', handler)
      }
    }
  }, [])

  if (!display) {
    return null
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
