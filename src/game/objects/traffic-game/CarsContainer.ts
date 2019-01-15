import { ContainerConstructor } from '../../../utils/interfaces'
import CarLine from './CarLine'
import gameStore from '../../../store/GameStore'

/**
 * Contient toute les carLine
 */

export default class CarsContainer {
  private carLines: Phaser.GameObjects.Container[] = []

  constructor(scene: Phaser.Scene) {
    let yCounter = 0
    const heightRoadT = 390 / gameStore.ratioResolution

    while (yCounter < 3) {
      this.carLines[yCounter] = new CarLine({
        scene: scene,
        x: 0,
        y: Number(scene.game.config.height) - heightRoadT * yCounter,
      })

      yCounter += 1
    }
  }

  public update() {
    this.carLines.forEach(carLine => {
      carLine.update()
    })
  }
}
