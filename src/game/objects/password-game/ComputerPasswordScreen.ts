import { ContainerConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { Emitter } from '../../manager/GameManager'
import { GameEvents } from '../../../utils/enums'
import { List } from '../../../utils/extensions'

const passwordCharMap = {
  1: -100,
  2: -60,
  3: -20,
  4: 20,
  5: 60,
}

export default class ComputerPasswordScreen extends Phaser.GameObjects
  .Container {
  public readonly screen: Phaser.GameObjects.Sprite
  private stars: List<Phaser.GameObjects.Sprite> = new List()

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y)
    this.screen = this.createScreenSprite()
    this.add(this.screen)

    let passwordCount = 0
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, () => {
      passwordCount++
      if (passwordCount >= 5) {
        this.remove(this.stars)
      } else {
        this.stars.push(this.createStar(passwordCharMap[passwordCount]))
        this.add(this.stars.last())
      }
    })
    params.scene.add.existing(this)
  }

  private createStar = (offset: number): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(offset, -150, 'mdp_star')
    sprite
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)

    return sprite
  }

  private createScreenSprite = (): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(0, 0, 'mdp_screen_2')
    sprite
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)

    return sprite
  }
}
