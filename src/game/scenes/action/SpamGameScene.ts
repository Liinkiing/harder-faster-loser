import { scenesKeys } from '../../../utils/constants'
import BaseScene from '../BaseScene'
import Spam from '../../objects/Spam'
import { List } from '../../../utils/extensions'
import { randomRange } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'

export default class SpamGameScene extends MinigameScene {
  public spams: List<Spam> = new List<Spam>()
  constructor() {
    super({
      key: scenesKeys.SpamGame,
    })
  }

  public preload(): void {
    super.preload()
    this.load.image('close', '/static/assets/sprites/spam-game/CLOSE.png')
    this.load.image(
      'close_active',
      '/static/assets/sprites/spam-game/CLOSE_active.png'
    )
  }

  public create() {
    super.create()
    this.spams = new List<Spam>()
    this.input.setGlobalTopOnly(true)

    for (let nbrSpam = 0; nbrSpam < 10; nbrSpam++) {
      this.spams.push(this.createSpam())
    }
  }

  public update(time: number, delta: number): void {
    this.spams.forEach(spam => spam.update())
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.loadNextMinigame()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.loadNextMinigame()
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.SpamDestroyed, (spam: Spam) => {
      this.spams.remove(spam)
      if (this.spams.length === 0) {
        this.onSuccess()
      }
    })
    Emitter.on(GameEvents.SpamClicked, (spam: Spam) => {
      for (let i = 0; i < randomRange(1, 4); i++) {
        this.spams.push(this.createSpam())
      }
    })
  }

  private createSpam(): Spam {
    const availablesSpam = new List<string>([
      'sp_1',
      'sexyAnimation',
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
      texture: availablesSpam.random(),
    })
  }
}
