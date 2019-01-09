import { ContainerConstructor } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { randomRange } from '../../utils/functions'

export default class Spam extends Phaser.GameObjects.Container {
  private readonly spamContent?: Phaser.GameObjects.Sprite
  private readonly closeIcon?: Phaser.GameObjects.Sprite
  private readonly texture: string

  get isAnimated() {
    return !!(
      this.spamContent &&
      this.spamContent.anims &&
      this.spamContent.anims.animationManager.get(this.texture)
    )
  }

  constructor(params: ContainerConstructor & { texture: string }) {
    super(params.scene, params.x, params.y, params.children)
    this.texture = params.texture
    this.spamContent = this.createSpamContent(params.texture)
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

  public update(): void {
    if (this.isAnimated) {
      this.spamContent!.anims.play(this.texture, true)
    }
  }

  private createSpamContent = (
    spamTexture: string
  ): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(0, 0, spamTexture).setOrigin(0, 0)

    // defining the dimensions of the sprite
    const spriteAnim = sprite.anims.animationManager.get(this.texture)
    if (!!spriteAnim) {
      const [width, height] = [
        spriteAnim.frames[0].frame.width,
        spriteAnim.frames[0].frame.height,
      ]
      sprite.width = width
      sprite.height = height
    }
    sprite.setScale(
      1 / gameStore.ratioResolution,
      1 / gameStore.ratioResolution
    )

    sprite.setInteractive()
    sprite.input.hitArea.setSize(sprite.width, sprite.height) // defining the dimensions of the input hit area
    sprite.on('pointerdown', () => {
      Emitter.emit(GameEvents.SpamClicked, this)
      console.log('EMITED ' + GameEvents.SpamClicked)
    })

    return sprite
  }

  private createCloseIcon = (): Phaser.GameObjects.Sprite => {
    const x = this.spamContent!.width / gameStore.ratioResolution
    const close = this.scene.add
      .sprite(x, 0, 'close')
      .setOrigin(1, 0)
      .setScale(1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)
    close.setInteractive()
    close.on('pointerdown', () => {
      Emitter.emit(GameEvents.SpamDestroyed, this)
      console.log('EMITED ' + GameEvents.SpamDestroyed)
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
