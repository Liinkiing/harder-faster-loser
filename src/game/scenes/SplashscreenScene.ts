import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { black } from '../../utils/colors'
import gameManager from '../manager/GameManager'
import { gameWait } from '../../utils/functions'

const SOUND_WIND = 'wind'

export default class SplashscreenScene extends BaseScene {
  private splashscreenContainer?: Phaser.GameObjects.Container
  private splashscreenIntroduction?: Phaser.GameObjects.Sprite
  private greenBackground?: Phaser.GameObjects.Graphics
  private ticTac?: Phaser.GameObjects.Sprite
  private loader?: Phaser.GameObjects.Image
  private ground?: Phaser.GameObjects.Image
  private grounds?: Phaser.GameObjects.Image[] = []
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
      .image(
        window.innerWidth / 2,
        (this.splashscreenIntroduction.height * 8) /
          gameStore.ratioResolution /
          2 +
          280,
        'credits'
      )
      .setScale(0.5)
      .setOrigin(0.5, 0.5)

    if (!this.loaded) {
      this.loader = this.add
        .sprite(
          window.innerWidth / 2 + 140,
          (this.splashscreenIntroduction.height * 8) /
            gameStore.ratioResolution /
            2 +
            280,
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

    this.ground = this.createSplashscreenGround({ number: 0, width: 0 })

    // add grounds
    const groundWidthBase = this.ground!.width * (8 / gameStore.ratioResolution)
    let groundWidth = this.ground!.width * (8 / gameStore.ratioResolution)
    let ratio = window.innerWidth / groundWidth

    while (ratio > 1) {
      this.grounds!.push(
        this.createSplashscreenGround({ number: 1, width: groundWidth })
      )
      console.log('array length : ' + this.grounds!.length)
      groundWidth = groundWidthBase * (this.grounds!.length + 1)
      ratio = window.innerWidth / groundWidth
    }

    this.greenBackground = this.add.graphics()
    this.greenBackground.fillStyle(0x00e7b3, 1)
    this.greenBackground.fillRect(
      0,
      -1,
      window.innerWidth,
      this.splashscreenIntroduction.height * (8 / gameStore.ratioResolution) -
        68
    )

    this.splashscreenContainer = this.add.container(0, 0, [
      this.greenBackground,
      this.splashscreenIntroduction,
      this.ground,
    ])
    this.splashscreenContainer!.add(this.grounds!)
    this.splashscreenContainer!.add([this.loader!, credits])

    this.splashscreenContainer.y =
      window.innerHeight / 2 -
      (this.splashscreenIntroduction.height * 8) / gameStore.ratioResolution / 2
  }

  public update(time: number, delta: number): void {}

  public destroy(): void {
    gameManager.audio.stopAmbientMusic()
    gameManager.audio.stopUniqueSfx()
  }

  private createSplashscreenIntroduction = (): Phaser.GameObjects.Sprite => {
    return this.add
      .sprite(window.innerWidth / 2, 0, 'splashscreen_01')
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0.5, 0)
  }

  private createSplashscreenGround = (parameters: {
    number: any
    width: any
  }): Phaser.GameObjects.Image => {
    const { number, width } = parameters
    return this.add
      .sprite(
        number * width,
        (this.splashscreenIntroduction!.height * 8) /
          gameStore.ratioResolution +
          1,
        'ground_splashscreen'
      )
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0, 1)
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
        if (this.ticTac) {
          this.ticTac!.destroy()
        }
        if (this.loader) {
          this.loader.destroy()
        }
        await gameWait(this.time, 1) // We wait here because if we come back to the splashscreen scene (e.g from debug)
        // we cant directly play the animation
        this.splashscreenIntroduction!.play('splashscreen_02_animation')
        gameWait(this.time, 200).then(async () => {
          gameManager.audio.playSfx('crack', { volume: 0.85 })
          gameManager.audio.playUniqueSfx('falling', { volume: 0.5 })
          await gameWait(this.time, 500)
          gameManager.audio.playUniqueSfx('squash', { volume: 0.7 })
          await gameWait(this.time, 1000)
          gameManager.loadIntroduction()
        })
      })
    this.load.start()
  }
}
