import { scenesKeys } from '../../../utils/constants'
import Spam from '../../objects/Spam'
import { List } from '../../../utils/extensions'
import { randomRange } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import { MinigameGuideline } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { green, lightBlue, lightGray } from '../../../utils/colors'

const SOUND_SPAM_DESTROYED = 'explosion'
const SOUND_CLOSE_CLICK = 'beep'

export default class SpamGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Click&thinsp;!',
    subtitle: 'to close the spams',
  }
  public availableBackgroundColors = new List<string>([
    green,
    lightGray,
    lightBlue,
  ])

  public spams: List<Spam> = new List<Spam>()
  constructor() {
    super({
      key: scenesKeys.SpamGame,
    })
  }

  public create() {
    super.create()
    this.spams = new List<Spam>()
    this.input.setGlobalTopOnly(true)
    const max =
      gameStore.difficulty * 1.25 +
      Phaser.Math.Clamp(gameStore.difficulty, 1, 15)
    for (let nbrSpam = 0; nbrSpam < max; nbrSpam++) {
      this.spams.push(this.createSpam())
    }
  }

  public update(time: number, delta: number): void {
    this.spams.forEach(spam => spam.update())
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.SpamDestroyed, (spam: Spam) => {
      gameManager.audio.playSfx(SOUND_SPAM_DESTROYED)
      this.spams.remove(spam)
      if (this.spams.length === 0) {
        this.onSuccess()
      }
    })
    Emitter.on(GameEvents.SpamClicked, (spam: Spam) => {
      gameManager.audio.playSfx(SOUND_CLOSE_CLICK, {
        detune: randomRange(-100, 100),
      })
      for (let i = 0; i < randomRange(1, 4); i++) {
        this.spams.push(this.createSpam())
      }
    })
  }

  private createSpam(): Spam {
    const availablesSpam = new List<string>([
      'sexyAnimation',
      'soldAnimation',
      'pizzaAnimation',
      'magicBottleAnimation',
      'musclesAnimation',
      'playAnimation',
      'toothAnimation',
      'hairAnimation',
      'gamblingAnimation',
      'yoAnimation',
    ])

    return new Spam({
      scene: this,
      x: 0,
      y: 0,
      texture: availablesSpam.random(),
    })
  }
}
