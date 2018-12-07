import {ContainerConstructor} from "../../utils/interfaces";
import gameStore from '../../store/GameStore';
import {Emitter} from "../manager/GameManager";
import {GameEvents} from "../../utils/enums";

export default class Spam extends Phaser.GameObjects.Container  {

  private readonly spamContent?: Phaser.GameObjects.Sprite
  private readonly closeIcon?: Phaser.GameObjects.Sprite

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y, params.children)

    if (this.x > (window.innerWidth - this.width/gameStore.ratioResolution)) {
      this.x = this.x - this.width/gameStore.ratioResolution
    }

    if (this.y > (window.innerHeight - this.height/gameStore.ratioResolution)) {
      this.y = this.y - this.height/gameStore.ratioResolution
    }

    this.spamContent = this.createSpamContent(params.spamTexture)
    this.add(this.spamContent)

    this.closeIcon = this.createCloseIcon()
    this.add(this.closeIcon)

    params.scene.add.existing(this);
  }

  private createSpamContent = (spamTexture: string): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(0,0, spamTexture).setOrigin(0,0)

    sprite.setScale(1/gameStore.ratioResolution, 1/gameStore.ratioResolution)

    sprite.setInteractive()

    return sprite
  }

  private createCloseIcon = (): Phaser.GameObjects.Sprite => {
    const x = this.spamContent!.width / gameStore.ratioResolution;
    const close = this.scene.add.sprite(x , 0, 'close').setOrigin(1,0).setScale(1/gameStore.ratioResolution, 1/gameStore.ratioResolution)
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
