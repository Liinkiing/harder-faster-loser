import {Emitter} from "../manager/GameManager";
import {BaseEvents} from "../../utils/enums";

export default class BaseScene extends Phaser.Scene {
  public init(): void {
    console.log(`init (${this.scene.key})`)
    this.game.scene.dump()
  }

  public preload(): void {
    console.log(`preload (${this.scene.key})`)
  }

  public create(): void {
    console.log(`create (${this.scene.key})`)
    Emitter.emit(BaseEvents.SceneCreated, this)
  }

  public update(time: number, delta: number): void {
    console.log(`update (${this.scene.key})`)
  }
}