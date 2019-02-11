import { SpriteConstructor } from '../../../utils/interfaces'
import { Omit } from '../../../utils/types'
import gameStore from '../../../store/GameStore'

export default class TokiDreams extends Phaser.GameObjects.Sprite {
  public static positionsOffset = [
    window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerWidth / 2,
    window.innerWidth / 2 - 10 - 20,
    window.innerWidth / 2 - 13 - 20,
    window.innerWidth / 2 - 16 - 20,
    window.innerWidth / 2 - 20 - 20,
    window.innerWidth / 2 - 24 - 20,
    window.innerWidth / 2 - 28 - 20,
    window.innerWidth / 2 - 28 - 20,
    window.innerWidth / 2 - 24 - 20,
    window.innerWidth / 2 - 20 - 20,
    window.innerWidth / 2 - 16 - 20,
    window.innerWidth / 2 - 13 - 20,
    window.innerWidth / 2 - 10 - 20,
    window.innerWidth / 2,
    window.innerWidth / 2 + 13 + 20,
    window.innerWidth / 2 + 16 + 20,
    window.innerWidth / 2 + 20 + 20,
    window.innerWidth / 2 + 24 + 20,
    window.innerWidth / 2 + 28 + 20,
    window.innerWidth / 2 + 28 + 20,
    window.innerWidth / 2 + 24 + 20,
    window.innerWidth / 2 + 20 + 20,
    window.innerWidth / 2 + 16 + 20,
    window.innerWidth / 2 + 13 + 20,
    window.innerWidth / 2 + 10 + 20,
    window.innerWidth / 2 + 10 + 20,
  ]

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
