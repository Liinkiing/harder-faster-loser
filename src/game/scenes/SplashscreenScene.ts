import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { black, green } from '../../utils/colors'
import gameManager from '../manager/GameManager'
import { gameWait } from '../../utils/functions'

const SOUND_WIND = 'wind'

export default class SplashscreenScene extends BaseScene {
  private splashscreenIntroduction?: Phaser.GameObjects.Sprite

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
    gameManager.audio.playUniqueSfx('clock', { loop: true, volume: 0.5 })
    gameStore.changeConfig({
      backgroundColor: black,
      fadeColor: black,
    })
    this.splashscreenIntroduction = this.createSplashscreenIntroduction()
    this.splashscreenIntroduction.anims.play('splashscreen_01_animation')
  }

  public update(time: number, delta: number): void {}

  protected destroy(): void {
    gameStore.changeConfig({
      backgroundColor: green,
      fadeColor: green,
    })
    gameManager.audio.stopAmbientMusic()
    gameManager.audio.stopUniqueSfx()
  }

  private createSplashscreenIntroduction = (): Phaser.GameObjects.Sprite => {
    return this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, 'splashscreen_01')
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0.5, 0.5)
  }

  private preloadGame = (): void => {
    this.load
      .pack('game', '/static/assets/sprites/pack.json', 'game')
      .on('complete', async () => {
        await gameWait(this.time, 1) // We wait here because if we come back to the splashscreen scene (e.g from debug)
        // we cant directly play the animation
        this.splashscreenIntroduction!.play('splashscreen_02_animation')
        gameWait(this.time, 200).then(async () => {
          gameManager.audio.playSfx('crack', { volume: 0.85 })
          gameManager.audio.playUniqueSfx('falling', { volume: 0.5 })
          await gameWait(this.time, 500)
          gameManager.audio.playUniqueSfx('squash', { volume: 0.7 })
          await gameWait(this.time, 1000)
          gameManager.loadHomescreen()
        })
      })
    this.load.start()
  }
}
