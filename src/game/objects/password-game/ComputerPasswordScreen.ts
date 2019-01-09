import { ContainerConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { Emitter } from '../../manager/GameManager'
import { GameEvents } from '../../../utils/enums'
import { List } from '../../../utils/extensions'
import { scenesKeys } from '../../../utils/constants'
import PasswordGameScene from '../../scenes/action/PasswordGameScene'
import { gameWait } from '../../../utils/functions'

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
    const passwordGame = this.scene.scene.get(
      scenesKeys.PasswordGame
    ) as PasswordGameScene

    Emitter.once(GameEvents.KeyboardPasswordButtonClicked, () => {
      this.screen.setTexture('mdp_screen_2')
    })
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, async () => {
      if (passwordGame.typedPassword.length < passwordGame.password.length) {
        this.addStarChar(passwordGame.typedPassword.length)
      } else if (
        passwordGame.typedPassword.length === passwordGame.password.length
      ) {
        this.addStarChar(passwordGame.typedPassword.length)
        await gameWait(this.scene.time, 30)
        this.remove(this.stars)
      }
    })
    params.scene.add.existing(this)
  }

  private addStarChar = (passwordCount: number): void => {
    this.stars.push(this.createStar(passwordCharMap[passwordCount]))
    this.add(this.stars.last())
  }

  private createStar = (offset: number): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(offset, -150, 'mdp_star')
    sprite
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)

    return sprite
  }

  private createScreenSprite = (): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(0, 0, 'mdp_screen_1')
    sprite
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)

    return sprite
  }
}
