import * as React from 'react'
import { FunctionComponent, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { INotification } from './Notification'
import gameManager, { Emitter } from '../../../game/manager/GameManager'
import { UIEvents } from '../../../utils/enums'
import Notification from './Notification'
import { Omit } from '../../../utils/types'
import { uuid } from '../../../utils/functions'

const SUCCESS_SOUND = 'success'
const INFO_SOUND = 'explosion'
const ERROR_SOUND = 'error'

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
      notificationsRoot.classList.add('visible')
    })
    Emitter.on(UIEvents.NotificationHide, (notification: INotification) => {
      setNotifications(n => {
        const filtered = n.filter(notif => notif.props.id !== notification.id)
        if (filtered.length === 0) {
          notificationsRoot.classList.remove('visible')
        }
        return filtered
      })
    })

    return () => {
      notificationsRoot.classList.remove('visible')
      Emitter.removeAllListeners(UIEvents.NotificationShow)
    }
  }, [])

  return ReactDOM.createPortal(notifications, notificationsRoot)
}

export const notify = (notification: Omit<INotification, 'id'>): void => {
  if (gameManager && gameManager.audio) {
    switch (notification.type) {
      case 'info':
        gameManager.audio.playSfx(INFO_SOUND, { volume: 0.3 })
        break
      case 'success':
        gameManager.audio.playSfx(SUCCESS_SOUND, { volume: 0.3 })
        break
      case 'error':
        gameManager.audio.playSfx(ERROR_SOUND, { volume: 0.3 })
        break
    }
  }
  Emitter.emit(UIEvents.NotificationShow, { ...notification, id: uuid() })
}

export default NotificationsContainer
