import * as React from 'react'
import { FunctionComponent, useCallback, useEffect } from 'react'
import Game from './components/Game'
import { observer } from 'mobx-react-lite'
import gameStore from './store/GameStore'
import Introduction from './components/Introduction'
import gameManager, { Emitter } from './game/manager/GameManager'
import { wait } from './utils/functions'
import NotificationsContainer, {
  notify,
} from './components/ui/notifications/NotificationsContainer'
import { UIEvents } from './utils/enums'

const App: FunctionComponent = () => {
  const { started } = gameStore
  const onLaunchGame = useCallback(async () => {
    try {
      // @ts-ignore
      if (document.body.mozRequestFullScreen) {
        // @ts-ignore
        await document.body.mozRequestFullScreen()
        await wait(150)
        // @ts-ignore
      } else if (document.body.webkitRequestFullscreen) {
        // @ts-ignore
        await document.body.webkitRequestFullscreen()
        await wait(150)
      } else {
        await document.body.requestFullscreen()
        await wait(150)
      }
    } finally {
      gameManager.startGame()
    }
  }, [])

  useEffect(() => {
    Emitter.on(UIEvents.ContentCached, () => {
      notify({
        content: 'Content is cached for offline use.',
        type: 'success',
      })
    })
    Emitter.on(UIEvents.NewContentAvailable, () => {
      notify({
        content: 'New content is available. Please refresh.',
        type: 'info',
      })
    })
  }, [])

  return (
    <div className="App">
      {!started && <Introduction onLaunchGame={onLaunchGame} />}
      <Game />
      <NotificationsContainer />
    </div>
  )
}

export default observer(App)
