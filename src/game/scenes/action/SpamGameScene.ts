import { scenesKeys } from '../../../utils/constants'
import BaseScene from '../BaseScene'
import Spam from '../../objects/Spam'
import { List } from '../../../utils/extensions'
import { randomRange } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'

export default class SpamGameScene extends BaseScene {
  public spams: List<Spam> = new List<Spam>()

  constructor() {
    super({
      key: scenesKeys.SpamGame,
    })
  }

  public preload(): void {
    this.load.pack(
      'preload',
      '/static/assets/sprites/spam-game/pack.json',
      'preload'
    )
    this.load.image('close', '/static/assets/sprites/spam-game/CLOSE.png')
    this.load.image(
      'close_active',
      '/static/assets/sprites/spam-game/CLOSE_active.png'
    )
  }

  public create() {
    super.create()
    this.spams = new List<Spam>()
    Emitter.on(GameEvents.RemainingTimeOver, () => {
      gameManager.restartActiveScene()
    })
    Emitter.on(GameEvents.SpamDestroyed, (spam: Spam) => {
      this.spams.remove(spam)
    })

    Emitter.on(GameEvents.SpamClicked, (spam: Spam) => {
      for (let i = 0; i < Math.floor(randomRange(1, 4)); i++) {
        this.spams.push(this.createSpam())
      }
    })

    this.input.setGlobalTopOnly(true)

    for (let nbrSpam = 0; nbrSpam < 10; nbrSpam++) {
      this.spams.push(this.createSpam())
    }
  }

  private createSpam(): Spam {
    const availablesSpam = new List<string>([
      'sp_1',
      'sp_2',
      'sp_3',
      'sp_4_1',
      'sp_5_1',
      'sp_6_1',
    ])

    return new Spam({
      scene: this,
      x: 0,
      y: 0,
      spamTexture: availablesSpam.random(),
    })
  }
  public update(time: number, delta: number): void {}
}
