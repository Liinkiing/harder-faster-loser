import gameManager, { Emitter } from '../manager/GameManager'
import { BaseEvents } from '../../utils/enums'
import AnimationHelper from '../manager/AnimationManager'
import gameStore from '../../store/GameStore'

export default class BaseScene extends Phaser.Scene {
  protected animationHelper?: AnimationHelper

  public init(): void {
    console.log(`init (${this.scene.key})`)
    this.game.scene.dump()
    Emitter.emit(BaseEvents.SceneInit, this)
    Emitter.removeAllListeners(BaseEvents.SceneDestroyed)
    Emitter.on(BaseEvents.SceneDestroyed, this.destroy)
  }

  public preload(): void {
    console.log(`preload (${this.scene.key})`)
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
      console.log('PRELOAD FROM BASESCENE FINISH')
    })
  }

  public create(): void {
    console.log(`create (${this.scene.key})`)
    gameManager.resizeCamera(window.innerWidth, window.innerHeight)
    gameManager.changeBackgroundColor(gameStore.config.backgroundColor)
    Emitter.emit(BaseEvents.SceneCreated, this)
    if (gameManager.audio.ambientPlaying) {
      gameManager.audio.stopAmbientMusic()
    }
    this.initListeners()
  }

  public update(time: number, delta: number): void {
    console.log(`update (${this.scene.key})`)
  }

  protected destroy(): void {}

  protected initListeners(): void {}
}
