import gameManager, { Emitter } from '../manager/GameManager'
import { BaseEvents } from '../../utils/enums'
import AnimationHelper from '../manager/AnimationManager'
import gameStore from '../../store/GameStore'

export default class BaseScene extends Phaser.Scene {
  protected animationHelper?: AnimationHelper

  public init(): void {
    this.game.scene.dump()
    Emitter.emit(BaseEvents.SceneInit, this)
  }

  public preload(): void {
    this.load.on('complete', () => {
      if (this.load.totalToLoad < 20) {
        // If there are less than 20 (arbitrary number) files to load, we are preloading for splashscreen
        this.animationHelper = new AnimationHelper(
          this,
          this.cache.json.get('splashscreen_animations')
        )
      } else {
        // else we are preloading entire game, so our AnimationHelper will get correction json animations
        this.animationHelper = new AnimationHelper(
          this,
          this.cache.json.get('animations')
        )
      }
    })
  }

  public create(): void {
    gameManager.resizeCamera(window.innerWidth, window.innerHeight)
    gameManager.changeBackgroundColor(gameStore.config.backgroundColor)
    Emitter.emit(BaseEvents.SceneCreated, this)
    if (gameManager.audio.ambientPlaying) {
      gameManager.audio.stopAmbientMusic()
    }
    this.initListeners()
  }

  public update(time: number, delta: number): void {}

  public destroy(): void {}

  protected initListeners(): void {}

  protected createFillerGraphics = (): void => {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff3300, 0)
    graphics.fillRect(100, 200, 600, 300)
    graphics.fillRect(100, 100, 100, 100)
    this.add.text(-100, -100, this.scene.key)
  }
}
