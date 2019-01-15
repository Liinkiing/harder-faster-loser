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
  private lineContainer?: Phaser.GameObjects.Container
  private spriteLine: Phaser.GameObjects.Sprite[] = []

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
        this.spriteLine = this.createCharacter(xCounter, yCounter)

        xCounter += 1
      }

      let currentLineContainer = this.lineContainers[this.lineContainers.length]
      currentLineContainer = this.add.container(
        this.windowWidth / 2,
        this.windowHeight - 100 - yCounter * 110,
        this.spriteLine
      )

      currentLineContainer.setSize(this.windowWidth, 80)

      // const hitArea = new Phaser.Geom.Rectangle(0, 0, this.windowWidth, 100)
      // currentLineContainer.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains)

      // currentLineContainer.setInteractive({ draggable: true });
      // this.input.setDraggable(currentLineContainer);

      // currentLineContainer.on('drag', function (pointer: any, dragX: number, dragY: number) {
      //     currentLineContainer.x = dragX
      //     console.log(pointer)
      //     console.log(dragX)
      //     console.log(dragY)
      // });

      this.physics.world.enable(currentLineContainer)

      yCounter += 1
    }

    // const goalZone = this.add.rectangle(this.windowWidth/2 + 22, 0, 56, this.windowHeight, 0xcecdd0, 0.3)
    //     .setOrigin(0,0)
    // this.physics.world.enable(goalZone)
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

  private createCharacter(
    xCounter: number,
    yCounter: number
  ): Phaser.GameObjects.Sprite[] {
    const offset = xCounter * 100

    const character = this.add
      .sprite(0, 0, 'subwayCharacterTimeAnimation')
      .setOrigin(0, 0)
      .setScale(1 / gameStore.ratioResolution)
      .setDepth(2)

    character.anims.play('subwayCharacterTimeAnimation', true)

    console.log(offset)
    const slab = this.add
      .sprite(0, 0, 'subway_grey_square')
      .setOrigin(0, 0)
      .setScale(1 / gameStore.ratioResolution)
      .setDepth(1)

    slab.y = slab.height / gameStore.ratioResolution

    // if (xCounter === 3) {
    //     this.physics.world.enable(slab)
    // }

    return [slab, character]
  }

  /**
   * Line = Container[]
   * PersoContainer = Container
   */
}
