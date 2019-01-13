import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import gameStore from '../../../store/GameStore'
import { randomRange } from '../../../utils/functions';
import gameManager from '../../manager/GameManager';
import RoadsContainer from '../../objects/traffic-game/RoadsContainer';
import CarsContainer from '../../objects/traffic-game/CarsContainer';

export default class TraficGameScene extends MinigameScene {
  private controls?: Phaser.GameObjects.Container
  private rageBar?: Phaser.GameObjects.Sprite
  private cursorRageBar?: Phaser.GameObjects.Sprite
  private roads?: Phaser.GameObjects.Container
  private availableRightCars: string[] =
    ["traffic_blue_car_animation", "traffic_cars_01_animation", "traffic_cars_04_animation"]
  private availableLeftCars: string[] =
    ["traffic_cars_02_animation", "traffic_cars_03_animation"]
  private widthLastCar: number = 0
  private positionXLastCar: number = 0
  private isTokiInScene: boolean = false
  private firstRow?: Phaser.GameObjects.Container
  private carsFirstRow: Phaser.GameObjects.Sprite[] = []
  private safeRageBarArea?: Phaser.GameObjects.Graphics

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

    this.roads = new RoadsContainer({
      scene: this,
      x: 0,
      y: 0
    })

    this.cars = new CarsContainer()

    // this.createCars()
    // this.controls = this.createControls()

    // this.firstRow = this.add.container(0,0, this.carsFirstRow)
  }

  public onFailure = (): void => {
    console.log('you failed')
  }

  public onSuccess = (): void => {
    gameManager.loadNextMinigame()
    console.log('you win')
  }

  public update = (time: number, delta: number): void => {
    // if (
    //   this.cursorRageBar!.x >
    //   10 + this.cursorRageBar!.width / gameStore.ratioResolution
    // ) {
    //   this.cursorRageBar!.x -= 1
    // }

    // if (this.cursorRageBar!.x < (this.rageBar!.width / gameStore.ratioResolution / 2 - 50) || this.cursorRageBar!.x > (this.rageBar!.width / gameStore.ratioResolution / 2 + 50)) {
    //   this.isCursorInSafeArea = false
    // } else {
    //   this.isCursorInSafeArea = true
    // }

    // if (this.isCursorInSafeArea) {
      
    //   // There we determine how much px the first line need to move on each frame depending of the game width
    //   // 500 = minigameDuration
    //   this.firstRow!.x += ((Number(this.game.config.width) / 500) + 0.01)
    // }

    // if (this.firstRow!.x > Number(this.game.config.width) && this.isTokiFree === false) {
    //   console.log('yolo')
    //   this.onSuccess()
      
    //   this.isTokiFree = true
    // }
  }

  private createControls(): Phaser.GameObjects.Container {
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
      this.hornSprite!.alpha = 1
      this.cursorRageBar!.x += 10
      this.hornSprite!.anims.play("traffic_horn_animation", true)

      this.hornSprite!.on('animationcomplete', () => {
        this.hornSprite!.alpha = 0
      })
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

  }

  private createCars(): void {
    let xCounter = 0
    let yCounter = 0

    const windowWidth = Number(this.game.config.width)
    const windowHeight = Number(this.game.config.height)
    const widthRoadT = this.roads![0].width / gameStore.ratioResolution
    const heightRoadT = this.roads![0].height / gameStore.ratioResolution
    const xRepeatCount = Math.ceil(windowWidth / widthRoadT)
    const yRepeatCount = Math.ceil(windowHeight / heightRoadT)

    const heightRoad = this.roads![0].height

    let carKey = ""

    let direction = "left"

    while (yCounter < yRepeatCount) {
      xCounter = 0
      this.widthLastCar = 0
      this.positionXLastCar = 0

      if (yCounter % 2 === 0) {
        if (direction === "left") {
          direction = "right"
        } else {
          direction = "left"
        }
      }

      while (this.positionXLastCar + this.widthLastCar < Number(this.game.config.width)) {
        if (direction === "right") {
          carKey = this.availableRightCars[Math.floor(randomRange(0, this.availableRightCars.length))]
        } else {
          carKey = this.availableLeftCars[Math.floor(randomRange(0, this.availableLeftCars.length))]
        }

        if (this.isTokiInScene === false && direction === "right" && this.positionXLastCar === 0) {
          carKey = "traffic_toki_animation"
          this.isTokiInScene = true
        } 

        const car = this.add.sprite(
          this.positionXLastCar + this.widthLastCar + 10,
          Number(this.game.config.height) - (heightRoad / gameStore.ratioResolution * yCounter),
          carKey
        )
          .setScale(1 / gameStore.ratioResolution)
          .setOrigin(0, 1)
          .setDepth(1000 - yCounter)
        car.anims.play(carKey, true)

        this.widthLastCar = car.width / gameStore.ratioResolution
        this.positionXLastCar = car.x

        if (carKey === "traffic_toki_animation") {
          this.hornSprite = this.add.sprite(
            car.x + (car.width / gameStore.ratioResolution) / 2 + 15,
            car.y - 25,
            "traffic_horn_animation"
          )
            .setScale(1 / gameStore.ratioResolution)
            .setOrigin(0.5, 1)
            .setDepth(10)
        }

        if (yCounter === 0 && carKey !== "traffic_toki_animation") {
          this.carsFirstRow.push(car)
        } else if (yCounter === 0 && carKey === "traffic_toki_animation") {
          this.carsFirstRow.push(this.hornSprite!)
          this.carsFirstRow.push(car)
        }

        xCounter += 1
      }
      yCounter += 1
    }
  }
}

