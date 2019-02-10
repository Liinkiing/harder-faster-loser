import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { green, lightBlue } from '../../../utils/colors'

interface Props {
  type: 'info' | 'success'
  duration?: number
}

const NotificationInner = styled.div<Props>`
  position: relative;
  pointer-events: all;
  width: 80%;
  margin: 10px 0;
  padding: 26px;
  background: ${(props: Props) => {
    switch (props.type) {
      case 'info':
        return lightBlue
      case 'success':
        return green
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
  return <NotificationInner {...props}>{props.children}</NotificationInner>
}

Notification.defaultProps = {
  duration: 4000,
}

export default Notification
