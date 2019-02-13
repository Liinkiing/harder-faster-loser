import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import { MinigameGuideline } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { gameWait, randomRange } from '../../../utils/functions'
import gameManager from '../../manager/GameManager'
import { List } from '../../../utils/extensions'
import {
  blue,
  darkGray,
  lightBlue,
  lightGray,
  mediumGray,
} from '../../../utils/colors'
import minigameManager from '../../manager/MinigameManager'

const SOUND_ERROR = 'error'
const SOUND_HIT = 'hit'
const SOUND_SUCCESS = 'success'

export default class SubwayGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Slide !',
    subtitle: 'to enter the train',
  }
  public availableBackgroundColors = new List<string>([lightBlue])

  private windowHeight?: number
  private windowWidth?: number
  private normalizedYOffset: number = 0

  private lineContainers: Phaser.GameObjects.Container[] = []
  private spriteLine: Phaser.GameObjects.Sprite[] = []
  private emptySlabs: Phaser.GameObjects.Sprite[] = []
  private toki?: Phaser.GameObjects.Sprite
  private indexCurrentRow: number = 0
  private indexNextRow: number = 1
  private slabWidth: number = 0
  private gapX: number = 0
  private gapY: number = 0
  private numberHiddenCharacters: number = 0

  private allowTokiToRun: boolean = true
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

  private isTweenFirstLineEnable: boolean = true
  private tweenLine: any = null

  constructor() {
    super({
      key: scenesKeys.SubwayGame,
    })
  }

  public create() {
    super.create()
    gameManager.suspendMinigame()
    this.resetVariables()
    this.windowHeight = Number(this.game.config.height)
    this.windowWidth = Number(this.game.config.width)
    this.normalizedYOffset =
      this.windowHeight! - this.windowHeight! * (6.6 / 10)

    this.createPlatform()
    this.createRailRoad()
    this.createTrain()

    let xPointer = 0
    let yPointer = 0

    this.numberHiddenCharacters = Math.floor(this.windowWidth / 90)
    if (this.numberHiddenCharacters % 2 === 1) {
      this.numberHiddenCharacters -= 1
    }
    const xCounter = this.numberHiddenCharacters * 3
    this.slabWidth = 55
    this.gapX =
      (this.windowWidth - this.numberHiddenCharacters * this.slabWidth) /
      (this.numberHiddenCharacters + 1)

    this.gapY = (this.windowHeight! * (6.6 / 10) - 4 * 55) / 5

    while (yPointer < 4) {
      xPointer = 0
      this.spriteLine = []
      const indexEmptySlab = this.generateEmptySlabPosition()

      while (xPointer < xCounter) {
        let slabTextureKey = ''
        let isEmptySlab = false

        if (xPointer === indexEmptySlab && yPointer > 0) {
          slabTextureKey = 'subway_yellow_border_square'
          isEmptySlab = true
        } else {
          slabTextureKey = 'subway_grey_square'
          isEmptySlab = false
        }

        const slab = this.add
          .sprite(
            xPointer * (this.slabWidth + this.gapX),
            this.slabWidth / 2,
            slabTextureKey
          )
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

          xPointer ===
            Math.floor(
              2 * this.numberHiddenCharacters - this.numberHiddenCharacters / 2
            ) && yPointer === 0
            ? (characterTextureKey = 'subwayTokiTimeAnimation')
            : (characterTextureKey = 'subwayCharacterTimeAnimation')

          const character = this.add
            .sprite(
              xPointer * (this.slabWidth + this.gapX),
              this.slabWidth / 2,
              characterTextureKey
            )
            .setOrigin(0, 1)
            .setScale(15 / gameStore.ratioResolution)
            .setDepth(-1)

          character.anims.play(characterTextureKey, true)

          this.spriteLine[this.spriteLine.length] = character

          if (characterTextureKey === 'subwayTokiTimeAnimation') {
            this.toki = character
          }
        }

        xPointer += 1
      }

      const currentLineContainer = this.add.container(
        -(this.numberHiddenCharacters * (this.slabWidth + this.gapX)) +
          this.gapX,
        this.windowHeight -
          this.slabWidth / 2 -
          yPointer * (this.slabWidth + this.gapY) -
          this.gapY,
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
      this.lineContainers[this.lineContainers.length - 1].setDepth(
        100 - yPointer
      )

      yPointer += 1
    }

    this.nextEmptySlab = this.lineContainers[this.indexNextRow].getByName(
      'empty_slab'
    ) as Phaser.GameObjects.Sprite

    this.currentEmptySlab = this.lineContainers[this.indexCurrentRow].getByName(
      'empty_slab'
    ) as Phaser.GameObjects.Sprite

    this.physics.world.enable(this.nextEmptySlab)

    this.initGoalZone()
    this.initListenerOnNextLineContainer()
    this.initAnimationTrain()
  }

  public update(time: number, delta: number): void {
    let threshold =
      -(this.gapY + this.slabWidth) * this.indexCurrentRow + this.slabWidth / 2
    let xIncrement = 0

    if (this.lastLineReached) {
      threshold = -(this.windowHeight! * (6.6 / 10) - (this.gapY + 5))
      xIncrement = this.gapX / 19.4
    }

    if (this.allowTokiToRun && this.toki!.y > threshold) {
      this.toki!.y -= 5
      this.toki!.x -= xIncrement
    }

    this.isOverlapping = this.physics.world.overlap(
      // @ts-ignore
      this.nextEmptySlab!,
      this.goalZone!
    )
  }

  private resetVariables(): void {
    this.windowHeight = 0
    this.windowWidth = 0
    this.normalizedYOffset = 0
    this.lineContainers = []
    this.spriteLine = []
    this.emptySlabs = []
    this.toki = undefined
    this.indexCurrentRow = 0
    this.indexNextRow = 1
    this.allowTokiToRun = true
    this.isOverlapping = false
    this.currentRow = undefined
    this.nextRow = undefined
    this.lastLineReached = false
    this.train = []
    this.firstTrain = undefined
    this.doorsActiveTrain = undefined
    this.activeTrainContainer = undefined
    this.containers = []
    this.nextEmptySlab = undefined
    this.currentEmptySlab = undefined
    this.goalZone = undefined
    this.gapX = 0
    this.gapY = 0
    this.numberHiddenCharacters = 0
    this.allowTokiToRun = true
    this.isTweenFirstLineEnable = true
  }

  private generateEmptySlabPosition(): integer {
    let index = Math.floor(randomRange(2, this.numberHiddenCharacters * 3 - 3))
    while (
      index ===
      Math.floor(
        2 * this.numberHiddenCharacters - this.numberHiddenCharacters / 2
      )
    ) {
      index = Math.floor(randomRange(2, this.numberHiddenCharacters * 3 - 3))
    }
    return index
  }

  private initAnimationTrain(): void {
    const translateValue =
      Number(this.windowWidth) / 2 +
      (this.activeTrainContainer!.x - this.firstTrain!.x) +
      this.activeTrainContainer!.width / gameStore.ratioResolution / 2 -
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
        if (minigameManager.hasPlayedCurrentMinigame) {
          gameManager.resumeMinigame()
        } else {
          this.tweenFirstLine()
        }
        this.doorsActiveTrain!.anims.resume()
      },
    })
  }

  private initListenerOnNextLineContainer(): void {
    if (this.indexNextRow < this.lineContainers!.length) {
      this.lineContainers[this.indexNextRow].on(
        'drag',
        (pointer: any, dragX: number, dragY: number) => {
          console.log(dragX)
          if (this.isTweenFirstLineEnable) {
            if (this.tweenLine) {
              this.tweenLine.stop()
            }
            this.isTweenFirstLineEnable = false
            gameManager.resumeMinigame()
          }
          const translateValue = Phaser.Math.Clamp(
            dragX,
            -(
              this.numberHiddenCharacters * 2 * (this.slabWidth + this.gapX) -
              this.gapX
            ),
            this.gapX
          )
          this.lineContainers[this.indexNextRow].x = translateValue
        }
      )

      this.lineContainers[this.indexNextRow].on('pointerup', () => {
        if (this.isOverlapping) {
          gameManager.audio.playSfx(SOUND_HIT, {
            detune: -500,
          })

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
        } else {
          gameManager.audio.playSfx(SOUND_ERROR, {
            detune: 500,
          })
        }
      })
    } else {
      this.lineContainers.forEach(lineContainer => {
        lineContainer.input.draggable = false
      })

      this.triggerEndTokiAnimation()
    }
  }

  private triggerEndTokiAnimation = async () => {
    gameManager.suspendMinigame()
    await gameWait(this.time, 500)
    this.lastLineReached = true
    const tokiWinAnimation = this.toki!.anims.play(
      'subwayTokiWinAnimation',
      true
    )

    gameManager.audio.playSfx(SOUND_SUCCESS, {
      detune: -500,
    })

    tokiWinAnimation.on('animationcomplete', () => {
      this.allowTokiToRun = false
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
            ease: 'Quint.easeIn',
          },
          repeat: 0,
          onComplete: () => {
            this.onSuccess()
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
  }

  private initGoalZone(): void {
    this.goalZone = this.add
      .rectangle(
        (this.numberHiddenCharacters / 2) * this.slabWidth +
          (this.numberHiddenCharacters / 2 + 1) * this.gapX,
        0,
        56,
        this.windowHeight,
        0xcecdd0,
        0
      )
      .setOrigin(0, 0)

    this.physics.world.enable(this.goalZone)
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
      .setScale(15 / gameStore.ratioResolution)

    const doorsAnimation = this.doorsActiveTrain!.anims
    doorsAnimation.play('subwayTrainDoorAnimation', true)
    doorsAnimation.pause()

    const insideActiveTrain = this.add
      .sprite(5, -25, 'subwayTrainInsideAnimation')
      .setOrigin(0, 1)
      .setScale(15 / gameStore.ratioResolution)

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

  private tweenFirstLine(): void {
    if (
      this.isTweenFirstLineEnable &&
      !minigameManager.hasPlayedCurrentMinigame
    ) {
      this.tweenLine = this.tweens.add({
        targets: this.lineContainers[1],
        x: {
          value: `-=20`,
          duration: 500,
          ease: 'Cubic.easeInOut',
        },
        repeat: -1,
        yoyo: true,
        onComplete: () => {},
      })
    }
  }
}
