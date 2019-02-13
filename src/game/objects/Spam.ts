import { ContainerConstructor } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { randomRange } from '../../utils/functions'
import gameManager from '../manager/GameManager'

export default class Spam extends Phaser.GameObjects.Container {
  private readonly spamContent?: Phaser.GameObjects.Sprite
  private readonly closeIcon?: Phaser.GameObjects.Sprite
  private readonly texture: string

  constructor(params: ContainerConstructor & { texture: string }) {
    super(params.scene, params.x, params.y, params.children)
    this.texture = params.texture
    this.spamContent = this.createSpamContent(params.texture)

    this.spamContent.width = this.spamContent.width * 15
    this.spamContent.height = this.spamContent.height * 15

    this.add(this.spamContent)

    this.closeIcon = this.createCloseIcon()
    this.add(this.closeIcon)

    this.x = randomRange(
      0,
      window.innerWidth - this.spamContent.width / gameStore.ratioResolution
    )
    this.y = randomRange(
      80,
      window.innerHeight - this.spamContent.height / gameStore.ratioResolution
    )

    params.scene.add.existing(this)
  }

  private createSpamContent = (
    spamTexture: string
  ): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add
      .sprite(0, 0, spamTexture)
      .setOrigin(0, 0)
      .setScale(15 / gameStore.ratioResolution)
      .setInteractive()

    sprite.anims.play(this.texture)
    sprite.on('pointerdown', () => {
      gameManager.vibrate()
      Emitter.emit(GameEvents.SpamClicked, this)
    })

    return sprite
  }

  private createCloseIcon = (): Phaser.GameObjects.Sprite => {
    const x = this.spamContent!.width / gameStore.ratioResolution
    const close = this.scene.add
      .sprite(x, 0, 'close')
      .setOrigin(1, 0)
      .setScale(1 / gameStore.ratioResolution)
    close.setInteractive()
    close.on('pointerdown', () => {
      gameManager.vibrate()
      Emitter.emit(GameEvents.SpamDestroyed, this)
      this.destroy(true)
    })
    close.on('pointerover', () => {
      close.setTexture('close_active')
    })
    close.on('pointerout', () => {
      close.setTexture('close')
    })
    return close
  }
}
