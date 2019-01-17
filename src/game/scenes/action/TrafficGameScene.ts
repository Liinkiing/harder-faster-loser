import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import gameStore from '../../../store/GameStore'
import { randomRange } from '../../../utils/functions'
import gameManager from '../../manager/GameManager'
import RoadsContainer from '../../objects/traffic-game/RoadsContainer'
import CarsContainer from '../../objects/traffic-game/CarsContainer'
import { MinigameGuideline } from '../../../utils/interfaces'
import minigameManager from '../../manager/MinigameManager'

export default class TraficGameScene extends MinigameScene {
  public guideline: MinigameGuideline = {
    title: 'Honk !',
    subtitle: 'to get out off the traffic jam',
  }
  private controls?: Phaser.GameObjects.Container
  private rageBar?: Phaser.GameObjects.Sprite
  private cursorRageBar?: Phaser.GameObjects.Sprite
  private horn?: Phaser.GameObjects.Sprite

  private roads: Phaser.GameObjects.Sprite[] = []
  private availableRightCars: string[] = [
    'traffic_blue_car_animation',
    'traffic_cars_01_animation',
    'traffic_cars_04_animation',
  ]
  private availableLeftCars: string[] = [
    'traffic_cars_02_animation',
    'traffic_cars_03_animation',
  ]
  private widthLastCar: number = 0
  private positionXLastCar: number = 0
  private isTokiInScene: boolean = false
  private tokisRow?: Phaser.GameObjects.Container
  private carsTokisRow: Phaser.GameObjects.Sprite[] = []
  private safeRageBarArea?: Phaser.GameObjects.Graphics

  private heightRoad: number = 0

  private cars?: CarsContainer

  private hornSprite?: Phaser.GameObjects.Sprite

  private isCursorInSafeArea: boolean = true

  private isTokiFree: boolean = false

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

    // this.roads = new RoadsContainer({
    //   scene: this,
    //   x: 0,
    //   y: 0
    // })

    // this.cars = new CarsContainer(this)

    this.createRoad()
    this.createCars()
    this.controls = this.createControls()

    this.tokisRow = this.add.container(0, 0, this.carsTokisRow).setDepth(997)
  }

  public onSuccess = (): void => {
    console.log('you win')
    minigameManager.addCurrentMinigameToPlayedGames()
    gameManager.loadPostMinigame()
  }

  public onFailure = (): void => {
    console.log('you failed')
    minigameManager.addCurrentMinigameToPlayedGames()
    gameManager.looseLife()
    gameManager.loadPostMinigame()
  }

  public update = (time: number, delta: number): void => {
    if (
      this.cursorRageBar!.x >
      10 + this.cursorRageBar!.width / gameStore.ratioResolution
    ) {
      this.cursorRageBar!.x -= 0.8
    }

    if (
      this.cursorRageBar!.x <
        this.rageBar!.width / gameStore.ratioResolution / 2 - 50 ||
      this.cursorRageBar!.x >
        this.rageBar!.width / gameStore.ratioResolution / 2 + 50
    ) {
      this.isCursorInSafeArea = false
    } else {
      this.isCursorInSafeArea = true
    }

    if (this.isCursorInSafeArea) {
      this.tokisRow!.x += 1
    }

    if (
      this.tokisRow!.x > Number(this.game.config.width) &&
      this.isTokiFree === false
    ) {
      this.onSuccess()
      this.isTokiFree = true
    }
  }

  private createControls(): Phaser.GameObjects.Container {
    this.horn = this.add
      .sprite(0, 0, 'horn_off')
      .setScale(1 / gameStore.ratioResolution)
      .setInteractive()
      .setOrigin(0, 0.5)

    this.horn.input.hitArea.setSize(this.horn.width, this.horn.height)

    const rageBarContainer = this.add.container(
      this.horn.width / gameStore.ratioResolution - 15,
      0,
      this.createRageBar()
    )

    const controlsContainer = this.add.container(
      Number(this.game.config.width) / 2 - 200,
      Number(this.game.config.height) - 100,
      [rageBarContainer, this.horn]
    )

    this.horn.on('pointerdown', () => {
      this.horn!.setTexture('traffic_horn_on')
      this.hornSprite!.alpha = 1
      this.cursorRageBar!.x += 10
      this.hornSprite!.anims.play('traffic_horn_animation', true)

      this.hornSprite!.on('animationcomplete', () => {
        this.hornSprite!.alpha = 0
      })
    })

    this.horn.on('pointerup', () => {
      this.horn!.setTexture('horn_off')
    })

    controlsContainer.setDepth(1001)

    return controlsContainer
  }

  private createRageBar(): any {
    this.rageBar = this.add
      .sprite(0, 0, 'rage_bar')
      .setScale(1 / gameStore.ratioResolution)
      .setOrigin(0, 0.5)

    this.safeRageBarArea = this.add.graphics()
    this.safeRageBarArea.fillStyle(0x6adeb8, 1)
    this.safeRageBarArea.fillRect(
      this.rageBar.width / gameStore.ratioResolution / 2 - 50,
      -(this.rageBar.height / gameStore.ratioResolution) / 2 + 4,
      100,
      this.rageBar.height / gameStore.ratioResolution - 16
    )

    this.cursorRageBar = this.add
      .sprite(
        this.rageBar.width / gameStore.ratioResolution / 2,
        -3,
        'rage_cursor'
      )
      .setScale(1 / gameStore.ratioResolution)

    return [this.rageBar, this.safeRageBarArea, this.cursorRageBar]
  }

  private createRoad(): void {
    this.roads![this.roads!.length] = this.add
      .sprite(0, Number(this.game.config.height), 'road')
      .setScale(1 / gameStore.ratioResolution)
      .setOrigin(0, 1)

    let xCounter = 0
    let yCounter = 0
    const windowWidth = Number(this.game.config.width)
    const windowHeight = Number(this.game.config.height)
    const widthRoadT = this.roads![0].width / gameStore.ratioResolution
    const heightRoadT = this.roads![0].height / gameStore.ratioResolution
    const xRepeatCount = Math.ceil(windowWidth / widthRoadT)
    const yRepeatCount = Math.ceil(windowHeight / heightRoadT)

    this.heightRoad = this.roads![0].height
    const widthRoad = this.roads![0].width

    while (yCounter < yRepeatCount) {
      xCounter = 0

      while (xCounter < xRepeatCount) {
        // Spawn de la route d'une ligne
        const road = this.add
          .sprite(
            (widthRoad / gameStore.ratioResolution) * xCounter,
            Number(this.game.config.height) -
              (this.heightRoad / gameStore.ratioResolution) * yCounter,
            'road'
          )
          .setScale(1 / gameStore.ratioResolution)
          .setOrigin(0, 1)

        this.roads![this.roads!.length] = road
        xCounter += 1
      }

      yCounter += 1
    }
  }

  private createCars(): void {
    let yCounter = 0

    const windowWidth = Number(this.game.config.width)
    const windowHeight = Number(this.game.config.height)
    const widthRoadT = 1005 / gameStore.ratioResolution
    const heightRoadT = 390 / gameStore.ratioResolution
    const yRepeatCount = Math.ceil(windowHeight / heightRoadT)
    const heightRoad = 390

    let carKey = ''
    let direction = 'right'

    while (yCounter < yRepeatCount) {
      this.widthLastCar = 0
      this.positionXLastCar = 0

      if (yCounter % 2 === 0) {
        if (direction === 'right') {
          direction = 'left'
        } else {
          direction = 'right'
        }
      }

      while (
        this.positionXLastCar + this.widthLastCar <
        Number(this.game.config.width)
      ) {
        // Determine wich direction we need to get the correct sprite
        if (direction === 'right') {
          carKey = this.availableRightCars[
            Math.floor(randomRange(0, this.availableRightCars.length))
          ]
        } else {
          carKey = this.availableLeftCars[
            Math.floor(randomRange(0, this.availableLeftCars.length))
          ]
        }

        // Specific changing of carKey to add tokki to the scene
        if (
          this.isTokiInScene === false &&
          direction === 'right' &&
          this.positionXLastCar === 0 &&
          yCounter == 2
        ) {
          carKey = 'traffic_toki_animation'
          this.isTokiInScene = true
        }

        const car = this.add
          .sprite(
            this.positionXLastCar + this.widthLastCar + 10,
            Number(this.game.config.height) -
              (heightRoad / gameStore.ratioResolution) * yCounter,
            carKey
          )
          .setScale(1 / gameStore.ratioResolution)
          .setOrigin(0, 1)
          .setDepth(1000 - yCounter)
        car.anims.play(carKey, true)

        this.widthLastCar = car.width / gameStore.ratioResolution
        this.positionXLastCar = car.x

        // Ajout du sprite du klaxon
        if (carKey === 'traffic_toki_animation') {
          this.hornSprite = this.add
            .sprite(
              car.x + car.width / gameStore.ratioResolution / 2 + 15,
              car.y - 25,
              'traffic_horn_animation'
            )
            .setScale(1 / gameStore.ratioResolution)
            .setOrigin(0.5, 1)
            .setDepth(10)
        }

        // Ajout de la voiture dans le tableau de sprite de la 1ere ligne
        if (yCounter === 2 && carKey !== 'traffic_toki_animation') {
          this.carsTokisRow.push(car)
        } else if (yCounter === 2 && carKey === 'traffic_toki_animation') {
          this.carsTokisRow.push(this.hornSprite!)
          this.carsTokisRow.push(car)
        }
      }
      yCounter += 1
    }
  }
}
