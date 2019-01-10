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

  public create = async () => {
    super.create()
    const initial = gameStore.config.fade
    gameStore.changeConfig({ fade: false })
    gameManager.startScene(scenesKeys.PostMinigameScene)
    gameStore.changeConfig({ fade: initial })
    this.scene.stop(this.scene.key)
  }
}
