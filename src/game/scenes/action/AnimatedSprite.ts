import { SpriteConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'

export default class AnimatedSprite extends Phaser.GameObjects.Sprite {
  private spriteTexture: string
  private readonly animatedSprite?: Phaser.GameObjects.Sprite

  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture)

    this.scene = params.scene
    this.x = params.x
    this.y = params.y
    this.spriteTexture = params.texture
    this.animatedSprite = this.createAnimatedSprite()

    params.scene.add.existing(this)
  }

  private createAnimatedSprite = (): Phaser.GameObjects.Sprite => {
    const sprite = this.scene.add.sprite(this.x, this.y, this.spriteTexture)

    const spriteAnim = sprite.anims.animationManager.get(this.spriteTexture)

    if (!!spriteAnim) {
      const [width, height] = [
        spriteAnim.frames[0].frame.width,
        spriteAnim.frames[0].frame.height,
      ]
      sprite.width = width
      sprite.height = height
    }

    return sprite
  }
}
