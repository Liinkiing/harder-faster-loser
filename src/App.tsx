import * as React from 'react'
import { FunctionComponent, useCallback } from 'react'
import Game from './components/Game'
import { observer } from 'mobx-react-lite'
import gameStore from './store/GameStore'
import Introduction from './components/Introduction'
import gameManager from './game/manager/GameManager'
import { wait } from './utils/functions'

const App: FunctionComponent = () => {
  const { started } = gameStore
  const onLaunchGame = useCallback(async () => {
    // @ts-ignore
    if (document.body.mozRequestFullScreen) {
      // @ts-ignore
      await document.body.mozRequestFullScreen()
      // @ts-ignore
    } else if (document.body.webkitRequestFullscreen) {
      // @ts-ignore
      await document.body.webkitRequestFullscreen()
    } else {
      await document.body.requestFullscreen()
    }
    await wait(150)
    gameManager.startGame()
  }, [])

  return (
    <div className="App">
      {!started && <Introduction onLaunchGame={onLaunchGame} />}
      <Game />
    </div>
  )
}

export default observer(App)
