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
  private emptySlabs: Phaser.GameObjects.Sprite[] = []
  private toki?: Phaser.GameObjects.Sprite
  private toggleTokiRun: boolean = false
  private currentRow: number = 0
  private nextRow: number = 1

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
      this.spriteLine = []

      while (xCounter < 4) {
        let slabTextureKey = ''
        let isEmptySlab = false

        if (xCounter === 3 && yCounter > 0) {
          slabTextureKey = 'subway_yellow_border_square'
          isEmptySlab = true
        } else {
          slabTextureKey = 'subway_grey_square'
          isEmptySlab = false
        }

        const slab = this.add
          .sprite(xCounter * 100, 50, slabTextureKey)
          .setOrigin(0, 1)
          .setScale(1 / gameStore.ratioResolution)
          .setDepth(1)

        this.spriteLine[this.spriteLine.length] = slab

        if (isEmptySlab) {
          slab.name = 'empty_slab'
          this.emptySlabs[this.emptySlabs.length] = slab
        }

        if (!isEmptySlab) {
          let characterTextureKey = ''

          xCounter === 2 && yCounter == 0
            ? (characterTextureKey = 'subwayTokiTimeAnimation')
            : (characterTextureKey = 'subwayCharacterTimeAnimation')

          const character = this.add
            .sprite(xCounter * 100, 50, characterTextureKey)
            .setOrigin(0, 1)
            .setScale(1 / gameStore.ratioResolution)
            .setDepth(2)

          character.anims.play(characterTextureKey, true)

          this.spriteLine[this.spriteLine.length] = character

          if (xCounter === 2 && yCounter == 0) {
            this.toki = character
          }
        }

        xCounter += 1
      }

      const currentLineContainer = this.add.container(
        30,
        this.windowHeight - 80 - yCounter * 100,
        this.spriteLine
      )

      currentLineContainer.setSize(this.windowWidth * 2, 80)
      const hitArea = new Phaser.Geom.Rectangle(0, 0, this.windowWidth * 2, 100)
      currentLineContainer.setInteractive(
        hitArea,
        Phaser.Geom.Rectangle.Contains
      )
      currentLineContainer.setInteractive({ draggable: true })
      this.input.setDraggable(currentLineContainer)

      currentLineContainer.on('pointerdown', () => {
        this.toki!.anims.play('subwayTokiRunAnimation', true)
        this.currentRow += 1
        this.nextRow += 1

        const nextRow = this.lineContainers[this.nextRow]
        const currentRow = this.lineContainers[this.currentRow]

        if (nextRow) {
          this.physics.world.enable(nextRow.getByName('empty_slab'))
        }

        if (currentRow) {
          this.physics.world.disable(currentRow.getByName('empty_slab'))
        }

        this.toggleTokiRun = true
      })

      // currentLineContainer.on(
      //   'drag',
      //   (pointer: any, dragX: number, dragY: number) => {
      //     currentLineContainer.x = dragX
      //   }
      // )

      this.lineContainers[this.lineContainers.length] = currentLineContainer

      yCounter += 1
    }

    this.lineContainers[this.nextRow].on(
      'drag',
      (pointer: any, dragX: number, dragY: number) => {
        this.lineContainers[this.nextRow].x = dragX
      }
    )

    const goalZone = this.add
      .rectangle(
        this.windowWidth / 2 + 22,
        0,
        56,
        this.windowHeight,
        0xcecdd0,
        0.5
      )
      .setOrigin(0, 0)

    this.physics.world.enable(goalZone)

    const yolo = this.lineContainers[this.nextRow].getByName('empty_slab')
    this.physics.world.enable(yolo)

    const collider = this.physics.add.overlap(this.emptySlabs, goalZone, () => {
      console.log('A slab is colliding with the goalZone')
    })
  }

  public update(time: number, delta: number): void {
    if (
      this.toggleTokiRun == true &&
      this.toki!.y > -50 - 100 * (this.currentRow - 1)
    ) {
      this.toki!.y -= 1
    } else {
      this.toggleTokiRun = false
    }
  }

  private createBackground(): void {
    const platform = this.add
      .graphics()
      .fillStyle(0x948d9b, 1)
      .fillRect(0, 0, this.windowWidth!, this.windowHeight! * (6.6 / 10))
    const warningLinePlatform = this.add
      .graphics()
      .fillStyle(0xfcdb73, 1)
      .fillRect(0, 15, this.windowWidth!, 15)

    this.add.container(
      0,
      this.windowHeight! - this.windowHeight! * (6.6 / 10),
      [platform, warningLinePlatform]
    )
  }
}
