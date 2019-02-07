import { ContainerConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'

export default class RoadsContainer extends Phaser.GameObjects.Container {
  public roads: Phaser.GameObjects.Sprite[] = []
  private widthRoad?: number
  public heightRoad?: number

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y)

    this.createRoads()
    params.scene.add.existing(this)
  }

  private createRoads(): Phaser.GameObjects.Sprite[] {
    this.roads![this.roads!.length] = this.scene.add
      .sprite(0, Number(this.scene.game.config.height), 'road')
      .setScale(15 / gameStore.ratioResolution)
      .setOrigin(0, 1)

    let xCounter = 0
    let yCounter = 0
    const windowWidth = Number(this.scene.game.config.width)
    const windowHeight = Number(this.scene.game.config.height)
    const widthRoadT = (this.roads![0].width * 15) / gameStore.ratioResolution
    const heightRoadT = (this.roads![0].height * 15) / gameStore.ratioResolution
    const xRepeatCount = Math.ceil(windowWidth / widthRoadT)
    const yRepeatCount = Math.ceil(windowHeight / heightRoadT)

    this.heightRoad = this.roads![0].height
    const widthRoad = this.roads![0].width

    while (yCounter < yRepeatCount) {
      xCounter = 0

      while (xCounter < xRepeatCount) {
        // Spawn de la route d'une ligne
        const road = this.scene.add
          .sprite(
            (widthRoad / gameStore.ratioResolution) * xCounter,
            Number(this.scene.game.config.height) -
              (this.heightRoad / gameStore.ratioResolution) * yCounter,
            'road'
          )
          .setScale(15 / gameStore.ratioResolution)
          .setOrigin(0, 1)

        this.roads![this.roads!.length] = road
        this.add(road)
        xCounter += 1
      }

      yCounter += 1
    }
    return []
  }
}
