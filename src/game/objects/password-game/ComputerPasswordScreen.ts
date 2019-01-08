import { ContainerConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { Emitter } from '../../manager/GameManager'
import { GameEvents } from '../../../utils/enums'

const passwordCharMap = {
  1: -100,
  2: -60,
  3: -20,
  4: 20,
  5: 60,
}

export default class ComputerPasswordScreen extends Phaser.GameObjects
  .Container {
  private passwordCount: number = 0

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y)

    this.add(this.createScreenSprite())
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, () => {
      this.passwordCount++
      this.add(this.createStar(passwordCharMap[this.passwordCount]))
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
