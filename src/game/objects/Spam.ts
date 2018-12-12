import { ContainerConstructor } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { randomRange } from '../../utils/functions'

export default class Spam extends Phaser.GameObjects.Container {
  private readonly spamContent?: Phaser.GameObjects.Sprite
  private readonly closeIcon?: Phaser.GameObjects.Sprite

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y, params.children)

    this.spamContent = this.createSpamContent(params.spamTexture)
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

    // Display only if spam container is out of top screen
    // if (this.y < 0){
    //   console.log('WARNING: Out of screen : ' + this.y)
    //   console.log('Hauteur spam : ' + this.height/gameStore.ratioResolution)
    //   console.log('Hauteur screen : ' + window.innerHeight)
    //   console.log(this)
    // }

    params.scene.add.existing(this)
  }

  private createSpamContent = (
    spamTexture: string
  ): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(0, 0, spamTexture).setOrigin(0, 0)

    sprite.setScale(
      1 / gameStore.ratioResolution,
      1 / gameStore.ratioResolution
    )

    sprite.setInteractive()

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
