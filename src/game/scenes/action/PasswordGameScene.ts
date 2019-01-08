import { scenesKeys } from '../../../utils/constants'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import KeyboardContainer from '../../objects/password-game/KeyboardContainer'
import { Code } from '../../objects/password-game/KeyboardPasswordButton'
import { shuffle, wait } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import ComputerPasswordScreen from '../../objects/password-game/ComputerPasswordScreen'
import gameStore from '../../../store/GameStore'
import KeyboardPasswordButton from '../../objects/password-game/KeyboardPasswordButton'

const PASSWORD_DISPLAY_TIME = 3000

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

  public create = async () => {
    super.create()
    gameManager.suspendMinigame()
    this.typedPassword = []
    this.password = this.createPassword()
    await this.playIntroduction()
    gameManager.resumeMinigame()
    this.computerScreen = new ComputerPasswordScreen({
      scene: this,
      x: window.innerWidth / 2,
      y: window.innerHeight - 200,
    })
    this.keyboard = new KeyboardContainer({
      scene: this,
      y: window.innerHeight - 220,
      x: window.innerWidth / 2,
    })
    this.keyboard.x -= this.keyboard.getBounds().width / 2
  }

  public onFailure = (): void => {
    console.log('you failed')
    gameManager.loadNextMinigame()
  }

  public onSuccess = (): void => {
    console.log('you win')
    gameManager.loadNextMinigame()
  }

  public update = (time: number, delta: number): void => {}

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, async (code: Code) => {
      this.typedPassword.push(code)
      if (this.typedPassword.length < this.password.length) {
        const button = this.keyboard!.getButton(code)
        const paw = this.add
          .sprite(button!.getBounds().x, button!.getBounds().y, 'mdp_paw')
          .setScale(1 / gameStore.ratioResolution)
          .setOrigin(-0.5, -0.25)
        await wait(100)
        paw.destroy()
      }
      if (
        this.typedPassword.length === this.password.length &&
        this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        gameManager.suspendMinigame()
        this.computerScreen!.screen.anims.play('mdp_valid_animation')
        await wait(2000)
        this.onSuccess()
      } else if (
        this.typedPassword.length === this.password.length &&
        !this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        gameManager.suspendMinigame()
        this.computerScreen!.screen.anims.play('mdp_nope_animation')
        await wait(2000)
        this.onFailure()
      }
    })
  }

  private playIntroduction = async () => {
    return new Promise(resolve => {
      const buttons: KeyboardPasswordButton[] = []
      const animation = this.scene.scene.add
        .sprite(window.innerWidth / 2, window.innerHeight, 'mdp_paper')
        .setScale(1 / gameStore.ratioResolution)
        .setOrigin(0.5, 1)
        .anims.play('mdp_paper_animation')

      animation.on('animationcomplete', async () => {
        this.password.forEach((code, index) => {
          buttons.push(
            new KeyboardPasswordButton({
              scene: this,
              style: 'symbol',
              code: code as Code,
              x:
                window.innerWidth / 2 -
                115 +
                (index * 160) / gameStore.ratioResolution,
              y: window.innerHeight - 240,
            }).setOrigin(0.5, 1)
          )
        })

        await wait(PASSWORD_DISPLAY_TIME)
        animation.destroy()
        buttons.forEach(button => button.destroy())
        resolve()
      })
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
