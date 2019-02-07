import { SpriteConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'

/**
 * Création d'une car
 */

export default class Car extends Phaser.GameObjects.Sprite {
  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture)

    const car = params.scene.add
      .sprite(params.x, params.y, params.texture)
      .setScale(15 / gameStore.ratioResolution)
      .setOrigin(0, 1)
    car.anims.play(params.texture, true)
  }
}
