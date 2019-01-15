import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import { MinigameGuideline } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'

export default class SubwayGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Slide !',
    subtitle: 'to enter the train',
  }

  private windowHeight?: number
  private windowWidth?: number
  private lineContainers: Phaser.GameObjects.Container[] = []

  constructor() {
    super({
      key: scenesKeys.SubwayGame,
    })
  }

  public create() {
    this.windowHeight = Number(this.game.config.height)
    this.windowWidth = Number(this.game.config.width)
    this.createBackground()

    let xCounter = 0
    let yCounter = 0

    while (yCounter < 4) {
      xCounter = 0

      while (xCounter < 4) {
        this.createCharacter(xCounter, yCounter)

        xCounter += 1
      }

      yCounter += 1
    }
  }

  public update(time: number, delta: number): void {}

  private createBackground(): void {
    const graphics = this.add.graphics()
    graphics.fillStyle(0x948d9b, 1)
    graphics.fillRect(
      0,
      this.windowHeight! - this.windowHeight! * (2 / 3),
      this.windowWidth!,
      this.windowHeight! * (2 / 3)
    )
  }

  private createCharacter(xCounter: number, yCounter: number): void {
    /**
     * A refacto pour que ça soit dynamique
     */
    const offset = xCounter * 100
    const character = this.add
      .sprite(0 + offset, 0, 'subwayCharacterTimeAnimation')
      .setOrigin(0, 0)
      .setScale(1 / gameStore.ratioResolution)
      .setDepth(2)

    character.anims.play('subwayCharacterTimeAnimation', true)

    const slab = this.add
      .sprite(
        0 + offset,
        character.height / gameStore.ratioResolution / 2,
        'subway_grey_square'
      )
      .setOrigin(0, 0)
      .setScale(1 / gameStore.ratioResolution)
      .setDepth(1)

    this.lineContainers[this.lineContainers.length] = this.add.container(
      30,
      this.windowHeight! -
        character.height / gameStore.ratioResolution -
        yCounter * 110 -
        25,
      [slab, character]
    )
  }

  /**
   * Line = Container[]
   * PersoContainer = Container
   */
}
