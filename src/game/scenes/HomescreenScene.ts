import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import gameManager from '../manager/GameManager'
import { blue } from '../../utils/colors'
import { Shaker } from '../../Shaker'
import { List } from '../../utils/extensions'

enum TokiState {
  Sleeping,
  WakingUp,
  WakedUp,
}

const AVAILABLE_HURT_SOUNDS = new List(['hurtmc', 'hurtrb'])

export default class HomescreenScene extends BaseScene {
  private shaker?: Shaker
  private toki?: Phaser.GameObjects.Sprite
  private shakeFrame = 0
  private state: TokiState = TokiState.Sleeping

  constructor() {
    super({
      key: scenesKeys.Homescreen,
    })
  }

  public create(): void {
    super.create()
    this.shakeFrame = 0
    this.state = TokiState.Sleeping
    if (Shaker.hasDeviceMotion()) {
      this.shaker = new Shaker({ timeout: 10, threshold: 1 })
      this.shaker.start()
      this.shaker.addEventListener('shake', this.onShake)
    }
    gameManager.audio.resetDetune()
    gameManager.audio.playBg()
    gameManager.changeBackgroundColor(blue)
    // this.createActionIndicator()
    this.toki = this.add
      .sprite(window.innerWidth / 2, window.innerHeight, 'intro_sleep')
      .setOrigin(0.5, 1)
      .setScale(18 / gameStore.ratioResolution)
      .play('intro_sleep_animation')
  }

  public update(time: number, delta: number): void {}

  protected destroy(): void {
    super.destroy()
    if (this.shaker) {
      this.shaker.stop()
      this.shaker.removeEventListener('shake', this.onShake)
    }
  }

  private onShake = (): void => {
    console.log('ON SHAKE')
    if (this.state !== TokiState.WakingUp) {
      this.state = TokiState.WakingUp
    }
    if (this.state === TokiState.WakingUp) {
      this.toki!.anims.play('intro_shake_animation', false, this.shakeFrame)
      this.toki!.anims.stop()
      this.shakeFrame++
      this.shakeFrame = this.shakeFrame % 29
      if (this.shakeFrame === 9 || this.shakeFrame === 23) {
        // Corresponds to frame in which Toki is actually hurt
        gameManager.audio.playUniqueSfx(AVAILABLE_HURT_SOUNDS.random(), {
          volume: 0.9,
        })
      }
    }
    console.log(this.shakeFrame)
  }

  private createActionIndicator = () => {
    this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2 - 220, 'shake')
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setDepth(9999)
      .play('shake_animation')
  }
}
