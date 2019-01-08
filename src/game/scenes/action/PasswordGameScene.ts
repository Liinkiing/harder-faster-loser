import { scenesKeys } from '../../../utils/constants'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import KeyboardContainer from '../../objects/password-game/KeyboardContainer'
import { Code } from '../../objects/password-game/KeyboardPasswordButton'
import { shuffle } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import ComputerPasswordScreen from '../../objects/password-game/ComputerPasswordScreen'

export default class PasswordGameScene extends MinigameScene {
  private keyboard?: KeyboardContainer
  private computerScreen?: ComputerPasswordScreen
  private password: Code[] = []
  private typedPassword: Code[] = []

  constructor() {
    super({
      key: scenesKeys.PasswordMinigame,
    })
  }

  public create = (): void => {
    super.create()
    this.typedPassword = []
    this.password = this.createPassword()
    this.computerScreen = new ComputerPasswordScreen({
      scene: this,
      x: window.innerWidth / 2,
      y: window.innerHeight - 200,
    })
    this.keyboard = new KeyboardContainer({
      scene: this,
      y: window.innerHeight - 220,
      x: 40,
    })
  }

  public onFailure = (): void => {
    console.log('you failed')
    gameManager.restartActiveScene()
  }

  public onSuccess = (): void => {
    console.log('you win')
    gameManager.restartActiveScene()
  }

  public update = (time: number, delta: number): void => {}

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, (code: Code) => {
      this.typedPassword.push(code)
      if (
        this.typedPassword.length === this.password.length &&
        this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        this.onSuccess()
      } else if (
        this.typedPassword.length === this.password.length &&
        !this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        this.onFailure()
      }
    })
  }

  private createPassword = (): Code[] => {
    return Array.from(shuffle(['◻', '▲', '|||', '☰', 'O', 'U'])).reduce(
      (acc, value, index) => {
        if (index <= 4) {
          acc.push(value as Code)
        }

        return acc
      },
      [] as Code[]
    )
  }
}
