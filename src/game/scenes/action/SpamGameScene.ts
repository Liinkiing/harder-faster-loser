import {scenesKeys} from "../../../utils/constants";
import BaseScene from "../BaseScene";
import Spam from "../../objects/Spam";
import {List} from "../../../utils/extensions";
import {randomRange} from "../../../utils/functions";
import gameStore from '../../../store/GameStore';

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

    this.load.image('close', '/assets/sprites/spam-game/CLOSE.png')
  }

  public create(): void {
    const availablesSpam = new List<string>(["sp_1", "sp_2", "sp_3", "sp_4_1", "sp_5_1", "sp_6_1"])
    
    for (let i = 0; i < 100; i++) {
      const handleTimout = () => {
        this.spams.push(new Spam({
          scene: this,
          x: randomRange(0, window.innerWidth),
          y: randomRange(0, window.innerHeight),
          texture: availablesSpam.random()
        }).setScale(1/gameStore.ratioResolution, 1/gameStore.ratioResolution))
    
      }
    
      setTimeout(handleTimout, i * 100)
    }
  }

  public update(time: number, delta: number): void {
    // this.spams.forEach(spam => spam.update(time, delta))
  }


}
