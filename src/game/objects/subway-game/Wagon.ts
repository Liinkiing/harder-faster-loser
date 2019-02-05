import { SpriteConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'

export default class Wagon extends Phaser.GameObjects.Sprite {
  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture)

    const sprite = params.scene.add.sprite(params.x, params.y, params.texture)
  }
}
