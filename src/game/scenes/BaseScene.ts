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
  }

  public preload(): void {
    console.log(`preload (${this.scene.key})`)
    this.load.on('complete', () => {
      this.animationHelper = new AnimationHelper(
        this,
        this.cache.json.get('animations')
      )
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
    //console.log(`update (${this.scene.key})`)
  }

  protected initListeners(): void {}
}
