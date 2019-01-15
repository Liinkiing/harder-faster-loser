import { ContainerConstructor } from '../../../utils/interfaces'
import Car from './Car'
import gameStore from '../../../store/GameStore'

export default class CarLine extends Phaser.GameObjects.Container {
  private positionXLastCar: number = 0
  private widthLastCar: number = 0
  private yolo: number = 0

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y)

    //while (this.positionXLastCar + this.widthLastCar < Number(params.scene.game.config.width)) {

    const car = new Car({
      scene: params.scene,
      x: params.x!,
      y: params.y!,
      texture: 'traffic_cars_01_animation',
    })

    this.add(car)
    params.scene.add.existing(this)
  }
}
