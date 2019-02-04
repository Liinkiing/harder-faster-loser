import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import { MinigameGuideline } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { gameWait, randomRange } from '../../../utils/functions'
import Wagon from '../../objects/subway-game/Wagon'

export default class SubwayGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Slide !',
    subtitle: 'to enter the train',
  }

  private windowHeight?: number
  private windowWidth?: number
  private normalizedYOffset: number = 0

  private lineContainers: Phaser.GameObjects.Container[] = []
  private spriteLine: Phaser.GameObjects.Sprite[] = []
  private emptySlabs: Phaser.GameObjects.Sprite[] = []
  private toki?: Phaser.GameObjects.Sprite
  private indexCurrentRow: number = 0
  private indexNextRow: number = 1

  private toggleTokiRun: boolean = false
  private isOverlapping: boolean = false

  private currentRow?: Phaser.GameObjects.Container
  private nextRow?: Phaser.GameObjects.Container
  private lastLineReached: boolean = false

  private train: Phaser.GameObjects.Sprite[] = []
  private firstTrain?: Phaser.GameObjects.Sprite
  private doorsActiveTrain?: Phaser.GameObjects.Sprite
  private activeTrainContainer?: Phaser.GameObjects.Container

  private containers: any = []

  private nextEmptySlab?: Phaser.GameObjects.Sprite
  private currentEmptySlab?: Phaser.GameObjects.Sprite

  private goalZone?: Phaser.GameObjects.Rectangle

  constructor() {
    super({
      key: scenesKeys.SubwayGame,
    })
  }

  public create() {
    super.create()
    this.windowHeight = Number(this.game.config.height)
    this.windowWidth = Number(this.game.config.width)
    this.normalizedYOffset =
      this.windowHeight! - this.windowHeight! * (6.6 / 10)

    this.createPlatform()
    this.createRailRoad()
    this.createTrain()

    let xCounter = 0
    let yCounter = 0

    while (yCounter < 4) {
      xCounter = 0
      this.spriteLine = []
      const indexEmptySlab = this.generateEmptySlabPosition()

      while (xCounter < 12) {
        let slabTextureKey = ''
        let isEmptySlab = false

        if (xCounter === indexEmptySlab && yCounter > 0) {
          slabTextureKey = 'subway_yellow_border_square'
          isEmptySlab = true
        } else {
          slabTextureKey = 'subway_grey_square'
          isEmptySlab = false
        }

        const slab = this.add
          .sprite(xCounter * 90, 50, slabTextureKey)
          .setOrigin(0, 1)
          .setScale(1 / gameStore.ratioResolution)
          .setDepth(-1)

        this.spriteLine[this.spriteLine.length] = slab

        if (isEmptySlab) {
          slab.name = 'empty_slab'
          this.emptySlabs[this.emptySlabs.length] = slab
        }

        if (!isEmptySlab) {
          let characterTextureKey = ''

          xCounter === 6 && yCounter == 0
            ? (characterTextureKey = 'subwayTokiTimeAnimation')
            : (characterTextureKey = 'subwayCharacterTimeAnimation')

          const character = this.add
            .sprite(xCounter * 90, 50, characterTextureKey)
            .setOrigin(0, 1)
            .setScale(1 / gameStore.ratioResolution)
            .setDepth(-1)

          character.anims.play(characterTextureKey, true)

          this.spriteLine[this.spriteLine.length] = character

          if (characterTextureKey === 'subwayTokiTimeAnimation') {
            this.toki = character
          }
        }

        xCounter += 1
      }

      const currentLineContainer = this.add.container(
        -this.windowWidth + 45,
        this.windowHeight - 80 - yCounter * 105,
        this.spriteLine
      )

      currentLineContainer.setSize(this.windowWidth * 6, 80)
      const hitArea = new Phaser.Geom.Rectangle(
        -this.windowWidth,
        0,
        this.windowWidth * 10,
        100
      )
      currentLineContainer.setInteractive(
        hitArea,
        Phaser.Geom.Rectangle.Contains
      )
      currentLineContainer.setInteractive({ draggable: true })
      this.input.setDraggable(currentLineContainer)
      this.lineContainers[this.lineContainers.length] = currentLineContainer

      yCounter += 1
    }

    this.lineContainers[0].setDepth(1)

    this.nextEmptySlab = this.lineContainers[this.indexNextRow].getByName(
      'empty_slab'
    ) as Phaser.GameObjects.Sprite

    this.currentEmptySlab = this.lineContainers[this.indexCurrentRow].getByName(
      'empty_slab'
    ) as Phaser.GameObjects.Sprite

    this.physics.world.enable(this.nextEmptySlab)

    this.initColliderOnNextSlab()
    this.initListenerOnNextLineContainer()
    this.initAnimationTrain()
  }

  public update(time: number, delta: number): void {
    if (
      this.toggleTokiRun == true &&
      this.toki!.y > -80 - 105 * (this.indexCurrentRow - 1)
    ) {
      this.toki!.y -= 5
    } else if (
      this.toki!.y <= -80 - 105 * (this.indexCurrentRow - 1) &&
      this.lastLineReached == false
    ) {
      this.toggleTokiRun = false
    }

    if (
      this.toggleTokiRun &&
      this.lastLineReached &&
      this.toki!.y > -80 - 105 * this.indexCurrentRow
    ) {
      this.toki!.y -= 5
      this.toki!.x -= 1.3
    }

    this.isOverlapping = this.physics.world.overlap(
      //@ts-ignore
      this.nextEmptySlab!,
      this.goalZone!
    )
  }

  private generateEmptySlabPosition(): integer {
    let index = Math.floor(randomRange(2, 10))
    while (index === 6) {
      index = Math.floor(randomRange(2, 10))
    }
    return index
  }

  private initAnimationTrain(): void {
    const translateValue =
      this.activeTrainContainer!.x -
      this.activeTrainContainer!.width / gameStore.ratioResolution / 2 +
      20
    this.tweens.add({
      targets: this.containers,
      x: {
        value: `-=${translateValue}`,
        duration: 1300,
        ease: 'Cubic.easeOut',
      },
      repeat: 0,
      onComplete: () => {
        this.doorsActiveTrain!.anims.resume()
      },
    })
  }

  private initListenerOnNextLineContainer(): void {
    if (this.indexNextRow < this.lineContainers!.length) {
      this.lineContainers[this.indexNextRow].on(
        'drag',
        (pointer: any, dragX: number, dragY: number) => {
          let translateValue = Phaser.Math.Clamp(dragX, -689, 30)
          this.lineContainers[this.indexNextRow].x = translateValue
        }
      )

      this.lineContainers[this.indexNextRow].on('pointerup', () => {
        if (this.isOverlapping) {
          this.triggerRunAnimation()
          this.updateActiveRows()

          const translateValue =
            this.currentEmptySlab!.x -
            (Math.abs(this.currentRow!.x) + this.goalZone!.x)

          this.tweens.add({
            targets: this.currentRow,
            x: {
              value: `-=${translateValue}`,
              duration: 100,
              ease: 'Cubic.easeOut',
            },
            repeat: 0,
          })

          this.initListenerOnNextLineContainer()
          this.initColliderOnNextSlab()
        }
      })
    } else {
      this.lineContainers![this.indexCurrentRow].input.draggable = false
      this.triggerEndTokiAnimation()
    }
  }

  private triggerEndTokiAnimation = async () => {
    await gameWait(this.time, 500)
    this.lastLineReached = true
    this.toggleTokiRun = true
    const tokiWinAnimation = this.toki!.anims.play(
      'subwayTokiWinAnimation',
      true
    )

    tokiWinAnimation.on('animationcomplete', () => {
      console.log('toki win animation finished')

      this.toggleTokiRun = false
      this.toki!.x =
        this.activeTrainContainer!.width / gameStore.ratioResolution / 2
      this.toki!.y = -25
      this.toki!.setOrigin(0.5, 1)
      this.activeTrainContainer!.addAt(this.toki!, 1)

      const closeDoorsAnimation = this.doorsActiveTrain!.anims.playReverse(
        'subwayTrainDoorAnimation',
        true
      )
      this.activeTrainContainer!.add(closeDoorsAnimation)

      closeDoorsAnimation.on('animationcomplete', () => {
        const translateValue =
          this.containers[this.containers.length - 1].x +
          this.containers[this.containers.length - 1].width /
            gameStore.ratioResolution
        this.tweens.add({
          targets: this.containers,
          x: {
            value: `-=${translateValue}`,
            duration: 1300,
            ease: 'Circ.easeIn',
          },
          repeat: 0,
          onComplete: () => {
            // finished
          },
        })
      })
    })
  }

  private triggerRunAnimation(): void {
    const animation = this.toki!.anims.play('subwayTokiRunAnimation', true)

    animation.on('animationcomplete', () => {
      if (!this.lastLineReached) {
        this.toki!.anims.play('subwayTokiTimeAnimation', true)
      }
    })
  }

  private updateActiveRows(): void {
    this.indexCurrentRow += 1
    this.indexNextRow += 1

    this.nextRow = this.lineContainers[this.indexNextRow]
    this.currentRow = this.lineContainers[this.indexCurrentRow]

    if (this.nextRow) {
      this.nextEmptySlab = this.nextRow.getByName(
        'empty_slab'
      ) as Phaser.GameObjects.Sprite
      this.physics.world.enable(this.nextEmptySlab)
    }

    if (this.currentRow && this.indexCurrentRow > 0) {
      this.currentEmptySlab = this.currentRow.getByName(
        'empty_slab'
      ) as Phaser.GameObjects.Sprite
      this.physics.world.disable(this.currentRow.getByName('empty_slab'))
    }

    this.toggleTokiRun = true
  }

  private initColliderOnNextSlab(): void {
    this.goalZone = this.add
      .rectangle(
        this.windowWidth! / 2 + 22,
        0,
        56,
        this.windowHeight,
        0xcecdd0,
        0
      )
      .setOrigin(0, 0)

    this.physics.world.enable(this.goalZone)

    const collider = this.physics.add.overlap(
      this.nextEmptySlab as Phaser.GameObjects.GameObject,
      this.goalZone,
      () => {
        console.log('A slab is colliding with the goalZone')
        this.physics.world.removeCollider(collider)
      }
    )
  }

  private createRailRoad(): void {
    let xPointer = 0

    while (xPointer < this.game.config.width) {
      const railRoad = this.add
        .sprite(xPointer, this.normalizedYOffset, 'subway_railroad')
        .setOrigin(0, 1)
        .setScale(1 / gameStore.ratioResolution)

      xPointer = railRoad.x + railRoad.width / gameStore.ratioResolution
    }
  }

  private createTrain(): void {
    this.firstTrain = this.add
      .sprite(0, this.normalizedYOffset, 'subway_first_train')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    this.firstTrain.x = Number(this.windowWidth)

    const train1 = this.add
      .sprite(
        this.firstTrain.x + this.firstTrain.width / gameStore.ratioResolution,
        this.normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const train2 = this.add
      .sprite(
        train1.x + train1.width / gameStore.ratioResolution,
        this.normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const bodyActiveTrain = this.add
      .sprite(0, 0, 'subway_active_train')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    this.doorsActiveTrain = this.add
      .sprite(0, -25, 'subwayTrainDoorAnimation')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const doorsAnimation = this.doorsActiveTrain!.anims
    doorsAnimation.play('subwayTrainDoorAnimation', true)
    doorsAnimation.pause()

    const insideActiveTrain = this.add
      .sprite(5, -25, 'subwayTrainInsideAnimation')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    insideActiveTrain.anims.play('subwayTrainInsideAnimation', true)

    this.activeTrainContainer = this.add.container(
      train2.x + train2.width / gameStore.ratioResolution,
      this.normalizedYOffset,
      [insideActiveTrain, this.doorsActiveTrain, bodyActiveTrain]
    )

    this.activeTrainContainer.setSize(
      bodyActiveTrain.width,
      bodyActiveTrain.height
    )

    const train3 = this.add
      .sprite(
        this.activeTrainContainer.x +
          this.activeTrainContainer.width / gameStore.ratioResolution,
        this.normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    // const train4 = new Wagon({
    //   scene: this,
    //   x: train3.x + train3.width / gameStore.ratioResolution,
    //   y: this.normalizedYOffset,
    //   texture: 'subway_train'
    // }
    // )

    const train4 = this.add
      .sprite(
        train3.x + train3.width / gameStore.ratioResolution,
        this.normalizedYOffset,
        'subway_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    const lastTrain = this.add
      .sprite(
        train4.x + train4.width / gameStore.ratioResolution,
        this.normalizedYOffset,
        'subway_last_train'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    this.containers.push(this.firstTrain)
    this.containers.push(train1)
    this.containers.push(train2)
    this.containers.push(train3)
    this.containers.push(train4)
    this.containers.push(this.activeTrainContainer)
    this.containers.push(lastTrain)
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
}
