import { SpriteConstructor } from '../../../utils/interfaces';


export default class Car extends Phaser.GameObjects.Sprite {
  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture)

    console.log('new car')
  }
}