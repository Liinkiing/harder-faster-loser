import { scenesKeys } from '../../utils/constants'
import gameManager from '../manager/GameManager'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'

export default class BootScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Boot,
    })
  }

  public preload(): void {
    if (gameManager.isDesktop) {
      return
    }
    super.preload()
    this.load.setBaseURL(process.env.PUBLIC_URL)
    this.load.pack(
      'splashscreen',
      '/static/assets/sprites/pack.json',
      'splashscreen'
    )
  }

  public update(time: number, delta: number): void {}

  public create = async () => {
    if (gameManager.isDesktop) {
      return
    }
    super.create()
    gameStore.stopLoading()
    if (gameStore.config.dev) {
      this.startGame()
    }
  }

  public startGame = (): void => {
    if (gameManager.isDesktop) {
      return
    }
    gameStore.startGame()
    const initial = gameStore.config.fade
    gameStore.changeConfig({ fade: false })
    gameManager.loadSplashscreen()
    gameStore.changeConfig({ fade: initial })
    this.scene.stop(this.scene.key)
  }
}
