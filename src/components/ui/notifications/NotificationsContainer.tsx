import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { INotification } from './Notification'
import { Emitter } from '../../../game/manager/GameManager'
import { UIEvents } from '../../../utils/enums'
import Notification from './Notification'
import { Omit } from '../../../utils/types'
import { uuid } from '../../../utils/functions'

const notificationsRoot = document.getElementById(
  'notifications'
) as HTMLDivElement

const NotificationsContainer: FunctionComponent = props => {
  const [notifications, setNotifications] = useState<
    Array<React.ReactElement<INotification>>
  >([])
  useEffect(() => {
    Emitter.on(UIEvents.NotificationShow, (notification: INotification) => {
      setNotifications(n => [
        ...n,
        <Notification key={notification.id} {...notification} />,
      ])
    })
    Emitter.on(UIEvents.NotificationHide, (notification: INotification) => {
      setNotifications(n =>
        n.filter(notif => notif.props.id !== notification.id)
      )
    })

    return () => {
      Emitter.removeAllListeners(UIEvents.NotificationShow)
    }
  }, [])

  return ReactDOM.createPortal(notifications, notificationsRoot)
}

export const notify = (notification: Omit<INotification, 'id'>): void => {
  Emitter.emit(UIEvents.NotificationShow, { ...notification, id: uuid() })
}

export default NotificationsContainer
