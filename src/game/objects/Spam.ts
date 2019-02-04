import { ContainerConstructor } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { randomRange } from '../../utils/functions'

export default class Spam extends Phaser.GameObjects.Container {
  private readonly spamContent?: Phaser.GameObjects.Sprite
  private readonly closeIcon?: Phaser.GameObjects.Sprite
  private readonly texture: string
  private containerWidth?: number

  constructor(params: ContainerConstructor & { texture: string }) {
    super(params.scene, params.x, params.y, params.children)
    this.texture = params.texture
    this.spamContent = this.createSpamContent(params.texture)

    if (params.texture === 'yoAnimation') {
      this.spamContent.width = this.spamContent.width * 3
    }
    if (params.texture === 'hairAnimation') {
      this.spamContent.width = this.spamContent.width * 2
    }
    if (params.texture === 'magicBottleAnimation') {
      this.spamContent.width = this.spamContent.width * 2
    }

    this.add(this.spamContent)

    this.closeIcon = this.createCloseIcon()
    this.add(this.closeIcon)

    // set X & Y of spam container (80 for UI -> have to be replace)
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
    const sprite = this.scene.add.sprite(0, 0, spamTexture).setOrigin(0, 0)
    sprite.setScale(1 / gameStore.ratioResolution)

    if (spamTexture === 'yoAnimation') {
      sprite.setScale(3 / gameStore.ratioResolution)
    }

    if (spamTexture === 'magicBottleAnimation') {
      sprite.setScale(2 / gameStore.ratioResolution)
    }

    if (spamTexture === 'hairAnimation') {
      sprite.setScale(2 / gameStore.ratioResolution)
    }

    sprite.anims.play(this.texture)
    sprite.setInteractive()
    sprite.on('pointerdown', () => {
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
