import { SpriteConstructor } from '../../../utils/interfaces'
import { Omit } from '../../../utils/types'
import gameStore from '../../../store/GameStore'
import { gameWait, randomRange } from '../../../utils/functions'

const Y_OFFSET = 260
const X_OFFSET = -100

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

  private zzz: Phaser.GameObjects.Sprite

  constructor(params: Omit<SpriteConstructor, 'texture' | 'frame'>) {
    super(params.scene, params.x, params.y, '')
    const { getAnimationName } = this
    this.setOrigin(0.5, 0)
      .setScale(16 / gameStore.ratioResolution)
      .play(getAnimationName())
      .on('animationcomplete', () => {
        gameWait(params.scene.time, randomRange(800, 4000)).then(() => {
          try {
            this.play(getAnimationName())
          } catch (e) {}
        })
      })

    this.zzz = new Phaser.GameObjects.Sprite(
      params.scene,
      this.x + X_OFFSET,
      this.y + Y_OFFSET,
      'intro_zzz'
    )
      .setScale(12 / gameStore.ratioResolution)
      .play('intro_zzz_animation')

    params.scene.add.existing(this)
    params.scene.add.existing(this.zzz)
  }

  public setZzzPosition = (
    x?: number,
    y?: number,
    z?: number,
    w?: number
  ): void => {
    const [xPos, yPos] = [
      x ? x + X_OFFSET : X_OFFSET,
      y ? y + Y_OFFSET : Y_OFFSET,
    ]
    this.zzz.setPosition(xPos, yPos, z, w)
  }

  public destroy(fromScene?: boolean): void {
    super.destroy(fromScene)
    this.zzz.destroy(fromScene)
  }

  private getAnimationName = (): string => {
    const dream = Math.random() < 0.5 ? 'pizza' : 'unicorn'

    return `intro_${dream}_dream_animation`
  }
}
