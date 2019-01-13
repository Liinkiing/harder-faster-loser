import { ContainerConstructor } from '../../../utils/interfaces';

export default class CarLine extends Phaser.GameObjects.Container {
  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y)

    console.log('new car line')
  }
}