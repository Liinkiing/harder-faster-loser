import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import gameStore from '../../../store/GameStore'

export default class TraficGameScene extends MinigameScene {
  private controls?: Phaser.GameObjects.Container
  private rageBar?: Phaser.GameObjects.Sprite
  private cursorRageBar?: Phaser.GameObjects.Sprite

  constructor() {
    super({
      key: scenesKeys.TrafficGame,
    })
  }

  public preload(): void {
    super.preload()
  }

  public create() {
    super.create()

    this.controls = this.createControls()
  }

  createControls(): Phaser.GameObjects.Container {
    const horn = this.add
      .sprite(0, 0, 'horn_on')
      .setScale(1 / gameStore.ratioResolution)
      .setInteractive()
      .setOrigin(0, 0.5)

    horn.input.hitArea.setSize(horn.width, horn.height)

    const rageBarContainer = this.add.container(
      horn.width / gameStore.ratioResolution - 15,
      0,
      this.createRageBar()
    )

    const controlsContainer = this.add.container(
      Number(this.game.config.width) / 2 - 200,
      Number(this.game.config.height) - 100,
      [rageBarContainer, horn]
    )

    horn.on('pointerdown', () => {
      console.log('Horn activated')
      this.cursorRageBar!.x += 10
    })

    // this.physics.world.enable(horn)
    // this.physics.world.enable(rageBar)

    return controlsContainer
  }

  public createRageBar(): any {
    this.rageBar = this.add
      .sprite(0, 0, 'rage_bar')
      .setScale(1 / gameStore.ratioResolution)
      .setOrigin(0, 0.5)

    const safeRageBarArea = this.add.graphics()
    safeRageBarArea.fillStyle(0x6adeb8, 1)
    safeRageBarArea.fillRect(
      this.rageBar.width / gameStore.ratioResolution / 2 - 50,
      -(this.rageBar.height / gameStore.ratioResolution) / 2 + 5,
      100,
      this.rageBar.height / gameStore.ratioResolution - 15
    )

    this.cursorRageBar = this.add
      .sprite(
        this.rageBar.width / gameStore.ratioResolution / 2,
        -2,
        'rage_cursor'
      )
      .setScale(1 / gameStore.ratioResolution)

    return [this.rageBar, safeRageBarArea, this.cursorRageBar]
  }

  public onFailure = (): void => {
    console.log('you failed')
  }

  public onSuccess = (): void => {
    console.log('you win')
  }

  public update = (time: number, delta: number): void => {
    if (
      this.cursorRageBar!.x >
      10 + this.cursorRageBar!.width / gameStore.ratioResolution
    ) {
      this.cursorRageBar!.x -= 0.1
    }
  }
}
