import { SpriteConstructor } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import { useKeyboardInput } from '../../utils/hooks'

export default class SpamContent extends Phaser.GameObjects.Sprite {
  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame)

    this.setOrigin(0, 0)
  }
}
