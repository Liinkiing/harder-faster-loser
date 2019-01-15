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
        const slab = this.add
          .sprite(xCounter * 100, 50, 'subway_grey_square')
          .setOrigin(0, 1)
          .setScale(1 / gameStore.ratioResolution)
          .setDepth(1)

        this.spriteLine[this.spriteLine.length] = slab

        if (xCounter === 3) {
          this.emptySlabs[this.emptySlabs.length] = slab
        }

        if (xCounter !== 3) {
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
        this.windowHeight - 50 - yCounter * 100,
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
        this.toki!.anims.play('subwayTokiRunAnimation', false)
      })

      currentLineContainer.on(
        'drag',
        (pointer: any, dragX: number, dragY: number) => {
          currentLineContainer.x = dragX
        }
      )

      this.physics.world.enable(currentLineContainer)

      yCounter += 1
    }

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

    this.emptySlabs.forEach(slab => {
      this.physics.world.enable(slab)
    })

    const collider = this.physics.add.overlap(this.emptySlabs, goalZone, () => {
      console.log('A slab is colliding with the goalZone')
    })
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
}
