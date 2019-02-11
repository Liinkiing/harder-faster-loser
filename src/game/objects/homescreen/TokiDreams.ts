import { SpriteConstructor } from '../../../utils/interfaces'
import { Omit } from '../../../utils/types'
import gameStore from '../../../store/GameStore'

export default class TokiDreams extends Phaser.GameObjects.Sprite {
  constructor(params: Omit<SpriteConstructor, 'texture' | 'frame'>) {
    super(params.scene, params.x, params.y, '')
    const { getAnimationName } = this
    this.setOrigin(0.5, 0)
      .setScale(12 / gameStore.ratioResolution)
      .play(getAnimationName())
      .on('animationcomplete', () => {
        this.play(getAnimationName())
      })

    params.scene.add.existing(this)
  }

  private getAnimationName = (): string => {
    const dream = Math.random() < 0.5 ? 'pizza' : 'unicorn'

    return `intro_${dream}_dream_animation`
  }
}
