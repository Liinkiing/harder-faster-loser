import * as React from 'react'
import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

const notificationsRoot = document.getElementById(
  'notifications'
) as HTMLDivElement

const NotificationsContainer: FunctionComponent = props =>
  ReactDOM.createPortal(props.children, notificationsRoot)

export default NotificationsContainer
