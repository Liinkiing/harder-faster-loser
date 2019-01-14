import gameManager from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import gameStore from '../../../store/GameStore'
import { gameWait } from '../../../utils/functions'

export default class ElevatorGameScene extends MinigameScene {
  // Texture
  private elevatorTexture: string
  private floorsTexture: string
  private playerTexture: string
  private playerIrritatedTexture: string
  private playerArmsTexture: string
  private playerMusicNoteTexture: string
  private playerWaterDropTexture: string
  private caseWaterDropTexture: string
  private caseCallElevatorTexture: string
  private caseIrritatedTexture: string
  // Sprite
  private elevator?: Phaser.GameObjects.Sprite
  private floorsElevator?: Phaser.GameObjects.Sprite
  private elevatorContainer?: Phaser.GameObjects.Container
  private player?: Phaser.GameObjects.Sprite
  private playerArms?: Phaser.GameObjects.Sprite
  private playerMusicNote?: Phaser.GameObjects.Sprite
  private playerWaterDrop?: Phaser.GameObjects.Sprite
  private caseWaterDrop?: Phaser.GameObjects.Sprite
  private caseCallElevator?: Phaser.GameObjects.Sprite
  private caseIrritated?: Phaser.GameObjects.Sprite
  private playerContainer?: Phaser.GameObjects.Container
  // Variable
  private currentFrame: integer = 1
  private hitCaseCallElevator: integer = 0
  private nbrHitCaseCall: integer = 2

  constructor() {
    super({
      key: scenesKeys.ElevatorGame,
    })

    this.elevatorTexture = 'elevatorAnimation'
    this.floorsTexture = 'floorsAnimation'
    this.playerTexture = 'tokiWhistleAnimation'
    this.playerArmsTexture = 'tokiArmsAnimation'
    this.playerMusicNoteTexture = 'tokiMusicNoteAnimation'
    this.playerWaterDropTexture = 'tokiWaterDropAnimation'
    this.caseWaterDropTexture = 'tokiWaterDropAnimation'
    this.caseCallElevatorTexture = 'caseCallElevatorAnimation'
    this.caseIrritatedTexture = 'case_irritated'
    this.playerIrritatedTexture = 'tokiIrritatedAnimation'
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.loadNextMinigame()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.loadNextMinigame()
  }

  public preload(): void {
    super.preload()
  }

  public create() {
    super.create()
    this.createElevatorContent()
    this.createTokiContent()
  }

  public update(time: number, delta: number): void {
    if (this.currentFrame === 14) {
      this.makeTokiIrritated()
    }
  }

  private createTokiContent(): void {
    this.player = this.add
      .sprite(20, 0, this.playerTexture)
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.player.anims.play(this.playerTexture, true, 0)

    this.playerArms = this.add
      .sprite(
        this.player.width / gameStore.ratioResolution - 13,
        -this.player.height / gameStore.ratioResolution / 2,
        this.playerArmsTexture
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.playerArms.anims.play(this.playerArmsTexture, false, 0)
    this.playerArms.anims.stop()

    this.playerMusicNote = this.add
      .sprite(
        15,
        -this.player.height / gameStore.ratioResolution + 55,
        this.playerMusicNoteTexture
      )
      .setOrigin(1, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.playerMusicNote.anims.play(this.playerMusicNoteTexture, true, 0)

    this.playerWaterDrop = this.add
      .sprite(
        85,
        -this.player!.height / gameStore.ratioResolution + 25,
        this.playerWaterDropTexture
      )
      .setOrigin(0, 0)
      .setScale(1 / gameStore.ratioResolution)
    this.playerWaterDrop.setVisible(false)

    this.playerContainer = this.add.container(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height),
      [this.player, this.playerArms, this.playerMusicNote, this.playerWaterDrop]
    )
  }

  private makeTokiIrritated(): void {
    this.player!.anims.play(this.playerIrritatedTexture, true, 0)
    this.playerWaterDrop!.anims.play(this.playerWaterDropTexture, true, 0)
    this.playerWaterDrop!.setVisible(true)
    this.caseIrritated!.setVisible(true)
    this.caseWaterDrop!.anims.play(this.caseWaterDropTexture, true, 0)
    this.caseWaterDrop!.setVisible(true)
    this.playerMusicNote!.destroy()
  }

  private createElevatorContent(): void {
    this.currentFrame = 1

    this.elevator = this.add
      .sprite(0, 0, this.elevatorTexture)
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.elevator.anims.play(this.elevatorTexture, true, 0)
    this.elevator.anims.stop()

    this.floorsElevator = this.add
      .sprite(
        0,
        -this.elevator.height / gameStore.ratioResolution + 34,
        this.floorsTexture
      )
      .setOrigin(0.5, 0)
      .setScale(1 / gameStore.ratioResolution)
    this.floorsElevator.anims.play(this.floorsTexture, false, 0)
    this.floorsElevator.anims.stop()

    this.caseCallElevator = this.add
      .sprite(8, -20, this.caseCallElevatorTexture)
      .setOrigin(1, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.caseCallElevator.anims.play(this.caseCallElevatorTexture, true, 0)
    this.caseCallElevator.anims.stop()

    this.caseIrritated = this.add
      .sprite(13, -240, this.caseIrritatedTexture)
      .setOrigin(1, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.caseIrritated.setVisible(false)

    this.caseWaterDrop = this.add
      .sprite(-85, -325, this.caseWaterDropTexture)
      .setOrigin(0.5, 0.5)
      .setScale(-1 / gameStore.ratioResolution, 1 / gameStore.ratioResolution)
    this.caseWaterDrop.setVisible(false)

    this.elevatorContainer = this.add.container(
      Number(this.game.config.width) / 2,
      Number(this.game.config.height),
      [
        this.elevator,
        this.floorsElevator,
        this.caseCallElevator,
        this.caseIrritated,
        this.caseWaterDrop,
      ]
    )

    const onPointerDown = () => {
      this.hitCaseCallElevator++
      if (this.hitCaseCallElevator === this.nbrHitCaseCall) {
        this.currentFrame++
        this.hitCaseCallElevator = 0
      }
      this.currentFrame = Phaser.Math.Clamp(this.currentFrame, 1, 23)
      this.floorsElevator!.anims.play(
        this.floorsTexture,
        false,
        this.currentFrame
      )
      this.floorsElevator!.anims.stop()

      if (this.currentFrame >= this.floorsElevator!.texture.frameTotal - 2) {
        this.caseCallElevator!.removeAllListeners('pointerup')
        this.caseCallElevator!.removeAllListeners('pointerdown')

        new Promise(resolve => {
          this.caseWaterDrop!.setVisible(false)
          this.caseIrritated!.setVisible(false)

          const animation = this.elevator!.anims.play(
            this.elevatorTexture,
            true,
            0
          )
          animation.on('animationcomplete', async () => {
            await gameWait(this.time, 500)
            this.onSuccess()
            resolve()
          })
        })
      }

      this.caseCallElevator!.anims.play(this.caseCallElevatorTexture, false, 1)
      this.caseCallElevator!.anims.stop()

      this.playerArms!.anims.play(this.playerArmsTexture, false, 1)
      this.playerArms!.anims.stop()
    }

    const onPointerUp = () => {
      this.caseCallElevator!.anims.play(this.caseCallElevatorTexture, false, 0)
      this.caseCallElevator!.anims.stop()

      this.playerArms!.anims.play(this.playerArmsTexture, false, 0)
      this.playerArms!.anims.stop()
    }

    this.caseCallElevator.setInteractive()
    this.caseCallElevator.input.hitArea.setSize(
      this.caseCallElevator.width,
      this.caseCallElevator.height
    )
    this.caseCallElevator.on('pointerdown', onPointerDown)
    this.caseCallElevator.on('pointerup', onPointerUp)
  }
}
