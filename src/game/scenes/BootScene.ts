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
    super.preload()
    this.load.pack('preload', '/static/assets/sprites/pack.json', 'preload')
  }

  public create = async () => {
    super.create()
    gameManager.audio.playBg()
    const initial = gameStore.config.fade
    gameStore.changeConfig({ fade: false })
    gameManager.loadNextMinigame()
    gameStore.changeConfig({ fade: initial })
    this.scene.stop(this.scene.key)
  }
}
