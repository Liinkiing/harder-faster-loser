import {scenesKeys} from "../../../utils/constants";
import BaseScene from "../BaseScene";
import Spam from "../../objects/Spam";
import {List} from "../../../utils/extensions";
import {randomRange} from "../../../utils/functions";
import {GameEvents} from "../../../utils/enums";
import {Emitter} from "../../manager/GameManager";

export default class SpamGameScene extends BaseScene {

  public spams: List<Spam> = new List<Spam>()

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
    this.load.image('close_active', '/assets/sprites/spam-game/CLOSE_active.png')
  }

  public create() {
    super.create()
    this.spams = new List<Spam>()
    Emitter.on(GameEvents.SpamDestroyed, (spam: Spam) => {
      this.spams.remove(spam)
    })
    this.input.setGlobalTopOnly(true)
    const availablesSpam = new List<string>(["sp_1", "sp_2", "sp_3", "sp_4_1", "sp_5_1", "sp_6_1"])
    this.scene.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.spams.push(
          new Spam({
            scene: this,
            x: randomRange(0, window.innerWidth),
            y: randomRange(0, window.innerHeight),
            spamTexture: availablesSpam.random()
          })
        )
      }
    })
  }

  public update(time: number, delta: number): void {
  }


}
