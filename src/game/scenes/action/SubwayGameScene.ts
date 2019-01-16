import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import { MinigameGuideline } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { gameWait } from '../../../utils/functions'

export default class SubwayGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Slide !',
    subtitle: 'to enter the train',
  }

  private windowHeight?: number
  private windowWidth?: number
  private lineContainers: Phaser.GameObjects.Container[] = []
  private spriteLine: Phaser.GameObjects.Sprite[] = []
  private emptySlabs: Phaser.GameObjects.Sprite[] = []
  private toki?: Phaser.GameObjects.Sprite
  private toggleTokiRun: boolean = false
  private indexCurrentRow: number = 0
  private indexNextRow: number = 1
  private isOverlapping: boolean = false

  private currentRow?: Phaser.GameObjects.Container
  private nextRow?: Phaser.GameObjects.Container

  private train: Phaser.GameObjects.Sprite[] = []

  private firstTrain?: Phaser.GameObjects.Sprite

  private lastLineReached: boolean = false

  private activeTrainContainer?: Phaser.GameObjects.Container

  constructor() {
    super({
      key: scenesKeys.SubwayGame,
    })
  }

  public create() {
    this.windowHeight = Number(this.game.config.height)
    this.windowWidth = Number(this.game.config.width)

    this.createPlatform()
    this.createRailRoad()
    this.createTrain()

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
      this.lineContainers[this.lineContainers.length] = currentLineContainer

      yCounter += 1
    }

    const yolo = this.lineContainers[this.indexNextRow].getByName('empty_slab')
    this.physics.world.enable(yolo)

    this.initColliderOnCurrentSlab()
    this.initListenerOnCurrentLineContainer()
  }

  private initListenerOnCurrentLineContainer(): void {
    if (this.indexNextRow < this.lineContainers!.length) {
      this.lineContainers[this.indexNextRow].on(
        'drag',
        (pointer: any, dragX: number, dragY: number) => {
          this.lineContainers[this.indexNextRow].x = dragX
        }
      )

      this.lineContainers[this.indexNextRow].on('pointerup', () => {
        if (this.isOverlapping) {
          this.triggerRunAnimation()
          this.updateActiveRows()
          this.initListenerOnCurrentLineContainer()
          this.initColliderOnCurrentSlab()
        }
      })
    } else {
      this.lineContainers![this.indexCurrentRow].input.draggable = false

      console.log('test')

      this.triggerEndTokiAnimation()
    }
  }

  private triggerEndTokiAnimation = async () => {
    await gameWait(this.time, 3000)
    console.log('yolo')
    this.lastLineReached = true
    this.toggleTokiRun = true
    const animation = this.toki!.anims.play('subwayTokiRunAnimation', true)

    animation.on('animationcomplete', () => {
      console.log('toki run animation finished')
    })
  }

  private triggerRunAnimation(): void {
    this.toki!.anims.play('subwayTokiRunAnimation', true)
  }

  private updateActiveRows(): void {
    this.indexCurrentRow += 1
    this.indexNextRow += 1

    this.nextRow = this.lineContainers[this.indexNextRow]
    this.currentRow = this.lineContainers[this.indexCurrentRow]

    if (this.nextRow) {
      this.physics.world.enable(this.nextRow.getByName('empty_slab'))
    }

    if (this.currentRow && this.indexCurrentRow > 0) {
      this.physics.world.disable(this.currentRow.getByName('empty_slab'))
    }

    this.toggleTokiRun = true
    this.isOverlapping = false
  }

  private initColliderOnCurrentSlab(): void {
    const goalZone = this.add
      .rectangle(
        this.windowWidth! / 2 + 22,
        0,
        56,
        this.windowHeight,
        0xcecdd0,
        0
      )
      .setOrigin(0, 0)

    this.physics.world.enable(goalZone)

    const collider = this.physics.add.overlap(this.emptySlabs, goalZone, () => {
      console.log('A slab is colliding with the goalZone')

      this.isOverlapping = true
      this.physics.world.removeCollider(collider)
    })
  }

  private createRailRoad(): void {
    // const railRoadthis = this.add.sprite(
    //   0,
    //   this.windowHeight! - this.windowHeight! * (6.6 / 10),
    //   "subway_railroad"
    // )
    //   .setOrigin(0, 1)
    //   .setScale(1 / gameStore.ratioResolution)
  }

  private createTrain(): void {
    const normalizedYOffset =
      this.windowHeight! - this.windowHeight! * (6.6 / 10)
    this.firstTrain = this.add
      .sprite(0, normalizedYOffset, 'subway_first_train')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    //firstTrain.x = Number(this.windowWidth)

    this.firstTrain.x = -800

    const train1 = this.add
      .sprite(
        this.firstTrain.x + this.firstTrain.width / gameStore.ratioResolution,
        normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const train2 = this.add
      .sprite(
        train1.x + train1.width / gameStore.ratioResolution,
        normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const bodyActiveTrain = this.add
      .sprite(0, 0, 'subway_active_train')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const doorsActiveTrain = this.add
      .sprite(0, -25, 'subwayTrainDoorAnimation')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    doorsActiveTrain.anims.play('subwayTrainDoorAnimation', true)

    const insideActiveTrain = this.add
      .sprite(5, -25, 'subwayTrainInsideAnimation')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    insideActiveTrain.anims.play('subwayTrainInsideAnimation', true)

    this.activeTrainContainer = this.add.container(
      train2.x + train2.width / gameStore.ratioResolution,
      normalizedYOffset,
      [insideActiveTrain, doorsActiveTrain, bodyActiveTrain]
    )

    this.activeTrainContainer.setSize(
      bodyActiveTrain.width,
      bodyActiveTrain.height
    )

    const train3 = this.add
      .sprite(
        this.activeTrainContainer.x +
          this.activeTrainContainer.width / gameStore.ratioResolution,
        normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const train4 = this.add
      .sprite(
        train3.x + train3.width / gameStore.ratioResolution,
        normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const lastTrain = this.add
      .sprite(
        train4.x + train4.width / gameStore.ratioResolution,
        normalizedYOffset,
        'subway_last_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    this.addToTrainArray(this.firstTrain)

    // this.firstTrain.setInteractive()

    // this.firstTrain.on('pointerdown', () => {
    //   let tween = this.tweens.add({
    //     targets: [this.firstTrain],
    //     ease: 'Sine.easeInOut',
    //     x: "-= 200",
    //     duration: 5,
    //     repeat: 2,
    //     onComplete: () => {
    //       console.log('Coming train animation completed')
    //     },
    //     onUpdate: () => {
    //       console.log("ca update un max")
    //     }
    //   })

    //   tween.play(true)
    // })
  }

  private addToTrainArray(element: Phaser.GameObjects.Sprite): void {
    this.train[this.train.length] = element
  }

  private createPlatform(): void {
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

  public update(time: number, delta: number): void {
    if (
      this.toggleTokiRun == true &&
      this.toki!.y > -50 - 100 * (this.indexCurrentRow - 1)
    ) {
      this.toki!.y -= 1
    } else if (
      this.toki!.y <= -50 - 100 * (this.indexCurrentRow - 1) &&
      this.lastLineReached == false
    ) {
      this.toggleTokiRun = false
    }

    if (
      this.toggleTokiRun &&
      this.lastLineReached &&
      this.toki!.y > -50 - 100 * this.indexCurrentRow
    ) {
      console.log(this.indexCurrentRow)
      this.toki!.y -= 1.5
    }
  }
}
