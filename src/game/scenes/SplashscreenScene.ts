import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { black, green } from '../../utils/colors'
import gameManager from '../manager/GameManager'
import { gameWait } from '../../utils/functions'

const SOUND_WIND = 'wind'

export default class SplashscreenScene extends BaseScene {
  private splashscreenIntroduction?: Phaser.GameObjects.Sprite
  private ticTac?: Phaser.GameObjects.Sprite
  private loader?: Phaser.GameObjects.Image
  private loaded = false

  constructor() {
    super({
      key: scenesKeys.Splashscreen,
    })
  }

  public preload(): void {
    super.preload()
  }

  public create(): void {
    super.create()
    this.preloadGame()
    gameManager.audio.playAmbientMusic(SOUND_WIND)
    gameStore.changeConfig({
      backgroundColor: black,
      fadeColor: black,
    })
    this.splashscreenIntroduction = this.createSplashscreenIntroduction()
    const credits = this.add
      .image(window.innerWidth / 2, window.innerHeight / 2 + 280, 'credits')
      .setScale(0.5)
      .setOrigin(0.5, 0.5)

    if (!this.loaded) {
      this.loader = this.add
        .sprite(
          window.innerWidth / 2 + 140,
          window.innerHeight / 2 + 280,
          'loader'
        )
        .setScale(2)
        .setOrigin(0.5, 0.5)
        .play('loader_animation')

      let tick = false
      this.time.addEvent({
        callback: () => {
          if (!this.loaded) {
            tick = !tick
            if (!this.ticTac) {
              this.ticTac = this.createTicTac()
            }
            this.ticTac.setFrame(tick ? 0 : 1)
            gameManager.audio.playUniqueSfx('clock', {
              duration: 100,
              volume: 0.5,
              seek: tick ? 0.06 : 1.05,
            })
          }
        },
        delay: 1000,
        loop: true,
      })
    }

    this.splashscreenIntroduction.anims.play('splashscreen_01_animation')
  }

  public update(time: number, delta: number): void {}

  public destroy(): void {
    gameManager.audio.stopAmbientMusic()
    gameManager.audio.stopUniqueSfx()
  }

  private createSplashscreenIntroduction = (): Phaser.GameObjects.Sprite => {
    return this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, 'splashscreen_01')
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0.5, 0.5)
  }

  private createTicTac = (): Phaser.GameObjects.Sprite => {
    return this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, 'tic_tac')
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0.5, 0.5)
  }

  private preloadGame = (): void => {
    this.load
      .pack('game', '/static/assets/sprites/pack.json', 'game')
      .on('complete', async () => {
        this.loaded = true
        gameManager.loadHomescreen()
      })
    this.load.start()
  }
}
