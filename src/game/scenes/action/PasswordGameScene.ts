import { scenesKeys } from '../../../utils/constants'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import KeyboardContainer from '../../objects/password-game/KeyboardContainer'
import KeyboardPasswordButton, {
  Code,
} from '../../objects/password-game/KeyboardPasswordButton'
import { gameWait, shuffle } from '../../../utils/functions'
import { GameEvents } from '../../../utils/enums'
import ComputerPasswordScreen from '../../objects/password-game/ComputerPasswordScreen'
import gameStore from '../../../store/GameStore'

const PASSWORD_DISPLAY_TIME = 3000
const PAW_DISPLAY_TIME = 180

const EASY_PASSWORD_LENGTH = 3
const MEDIUM_PASSWORD_LENGTH = 4
const HARD_PASSWORD_LENGTH = 5

const SOUND_PASSWORD_INVALID = 'error'
const SOUND_KEYBOARD_BUTTON = 'beep'

export default class PasswordGameScene extends MinigameScene {
  public password: Code[] = []
  public typedPassword: Code[] = []
  private keyboard?: KeyboardContainer
  private computerScreen?: ComputerPasswordScreen

  constructor() {
    super({
      key: scenesKeys.PasswordGame,
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

  public update = (time: number, delta: number): void => {}

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.KeyboardPasswordButtonClicked, async (code: Code) => {
      if (this.typedPassword.length === this.password.length) {
        return
      }
      gameManager.audio.playSfx(SOUND_KEYBOARD_BUTTON)
      this.typedPassword.push(code)
      if (this.typedPassword.length <= this.password.length) {
        const button = this.keyboard!.getButton(code)
        const texture = button!.texture
        if (!this.game.device.os.desktop) {
          button!.setTexture(`${texture.key}_hover`)
        }
        const paw = this.add
          .sprite(button!.getBounds().x, button!.getBounds().y, 'mdp_paw')
          .setScale(1 / gameStore.ratioResolution)
          .setOrigin(-0.5, -0.25)
        gameWait(this.time, PAW_DISPLAY_TIME).then(() => {
          if (!this.game.device.os.desktop) {
            button!.setTexture(`${texture.key}`)
          }
          paw.destroy()
        })
      }
      if (
        this.typedPassword.length === this.password.length &&
        this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        gameManager.suspendMinigame()
        this.computerScreen!.screen.setDepth(1000).anims.play(
          'mdp_valid_animation'
        )
        await gameWait(this.time, 2000)
        this.onSuccess()
      } else if (
        this.typedPassword.length === this.password.length &&
        !this.password.every(
          (value, index) => this.typedPassword[index] === value
        )
      ) {
        gameManager.suspendMinigame()
        this.computerScreen!.screen.setDepth(1000).anims.play(
          'mdp_nope_animation'
        )
        gameManager.audio.playSfx(SOUND_PASSWORD_INVALID, {
          volume: 0.4,
          delay: 0.1,
        })
        gameWait(this.time, 2000).then(() => {
          this.onFailure()
        })
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

        await gameWait(this.time, PASSWORD_DISPLAY_TIME)
        animation.destroy()
        buttons.forEach(button => button.destroy())
        resolve()
      })
    })
  }

  private createPassword = (): Code[] => {
    let password = shuffle(['◻', '▲', '|||', '☰', 'O', 'U'])
    if (gameStore.difficulty <= 3) {
      password = password.slice(0, EASY_PASSWORD_LENGTH)
    } else if (gameStore.difficulty <= 6) {
      password = password.slice(0, MEDIUM_PASSWORD_LENGTH)
    } else {
      password = password.slice(0, HARD_PASSWORD_LENGTH)
    }
    return Array.from(password).reduce(
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
