import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import styled, { Keyframes } from 'styled-components'
import {
  black,
  green,
  hexToRgba,
  lightBlue,
  lightRed,
} from '../../../utils/colors'
import { disappearFromUp, slideInUp } from '../../../utils/keyframes'
import { useTimeout } from '../../../utils/hooks'
import { useRef } from 'react'
import { Emitter } from '../../../game/manager/GameManager'
import { UIEvents } from '../../../utils/enums'

export interface INotification {
  id: string
  type: 'info' | 'success' | 'error'
  content: string
  duration?: number
}

type Props = INotification

type StyledProps = Props & { animation: Keyframes }

const NotificationInner = styled.div<StyledProps>`
  position: relative;
  pointer-events: all;
  line-height: 18px;
  box-shadow: 4px 0 20px ${hexToRgba(black, 0.4)};
  animation: ${(props: StyledProps) => props.animation} 0.3s forwards
    ease-in-out;
  width: 80%;
  margin: 10px 0;
  padding: 26px;
  background: ${(props: StyledProps) => {
    switch (props.type) {
      case 'info':
        return lightBlue
      case 'success':
        return green
      case 'error':
        return lightRed
    }
  }};
  &::after {
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-color: #212529;
    border-style: solid;
    border-width: 4px;
    border-radius: 4px;
  }
  &::after,
  ::before {
    position: absolute;
    content: '';
    z-index: 0;
  }
`

const Notification: FunctionComponent<Props> = props => {
  const { duration, content } = props
  const [display, setDisplay] = useState(true)
  const [show, setShow] = useState(true)
  const container = useRef<HTMLDivElement>(null)
  useTimeout(
    () => {
      setShow(false)
    },
    duration!,
    []
  )

  useEffect(() => {
    const endHandler = (evt: AnimationEvent) => {
      if (evt.animationName === disappearFromUp.getName()) {
        setDisplay(false)
      }
    }

    if (container.current) {
      container.current.addEventListener('animationend', endHandler)
    }

    return () => {
      if (container.current) {
        container.current.removeEventListener('animationend', endHandler)
      }
    }
  }, [])

  if (!display) {
    Emitter.emit(UIEvents.NotificationHide, props)
    return null
  }

  return (
    <NotificationInner
      ref={container}
      {...props}
      animation={show ? slideInUp : disappearFromUp}
      children={content}
    />
  )
}

Notification.defaultProps = {
  duration: 4000,
}

export default Notification
