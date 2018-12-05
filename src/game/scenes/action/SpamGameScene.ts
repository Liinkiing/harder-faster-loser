import {scenesKeys} from "../../../utils/constants";
import BaseScene from "../BaseScene";
import Spam from "../../objects/Spam";
import {List} from "../../../utils/extensions";
import {randomRange} from "../../../utils/functions";

export default class SpamGameScene extends BaseScene {

  public spams: List<Spam> = new List<Spam>()
  public spam?: Spam
  public counter: number = 0

  constructor() {
    super({
      key: scenesKeys.SpamGame
    });
  }

  public preload(): void {
    this.load.pack(
      'preload',
      '/assets/sprites/spam-game/pack.json',
      'preload'
    )
  }

  public create(): void {
    const availablesSpam = new List<string>(["sp_1", "sp_2", "sp_3", "sp_4_1", "sp_5_1", "sp_6_1"])

    // for (let i = 0; i < 100; i++) {
    //   const handleTimout = () => {
    //     this.spams.push(new Spam({
    //       scene: this,
    //       x: randomRange(0, window.innerWidth),
    //       y: randomRange(0, window.innerHeight),
    //       texture: availablesSpam.random()
    //     }))
    //
    //   }
    //
    //   setTimeout(handleTimout, i * 1000)
    //   console.log(availablesSpam.random())
    // }
  }

  public update(time: number, delta: number): void {
    // this.spams.forEach(spam => spam.update(time, delta))
    this.counter += 1
    console.log(this.counter)
  }


}
