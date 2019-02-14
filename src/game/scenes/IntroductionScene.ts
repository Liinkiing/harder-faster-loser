import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { green } from '../../utils/colors'

export default class IntroductionScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Introduction,
    })
  }

  public destroy(): void {
    super.destroy()
    gameStore.changeConfig({
      backgroundColor: green,
      fadeColor: green,
    })
  }
}
