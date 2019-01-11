import { scenesKeys } from '../../../utils/constants'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import gameStore from '../../../store/GameStore'
import { gameWait } from '../../../utils/functions'

export default class SandwichGameScene extends MinigameScene {
  private skies?: Phaser.GameObjects.Sprite[] = []
  private buildings?: Phaser.GameObjects.Sprite[] = []
  private landscapes?: Phaser.GameObjects.Sprite[] = []
  private streetLights?: Phaser.GameObjects.Sprite[] = []
  private grounds?: Phaser.GameObjects.Sprite[] = []
  private lastKeyPressed?: 37 | 39
  private playerTexture: string
  private playerWinTexture: string
  private sandwichTexture: string
  private player?: Phaser.GameObjects.Sprite
  private sandwich?: Phaser.GameObjects.Sprite
  private currentFrame: integer = 0
  private leftBtn?: Phaser.GameObjects.Sprite
  private rightBtn?: Phaser.GameObjects.Sprite
  private isControlsEnabled?: boolean = true

  constructor() {
    super({
      key: scenesKeys.SandwichGame,
    })

    this.playerTexture = 'tokiRunAnimation'
    this.playerWinTexture = 'tokiWinAnimation'
    this.sandwichTexture = 'sandwichFlyingAnimation'
  }

  public preload(): void {
    super.preload()
    this.load.image(
      'sky',
      '/static/assets/sprites/sandwich-game/sandwich_plan_sky.png'
    )
    this.load.image(
      'building',
      '/static/assets/sprites/sandwich-game/sandwich_plan_building.png'
    )
    this.load.image(
      'landscape',
      '/static/assets/sprites/sandwich-game/sandwich_plan_landscape.png'
    )
    this.load.image(
      'streetLights',
      '/static/assets/sprites/sandwich-game/sandwich_plan_street-lights.png'
    )
    this.load.image(
      'ground',
      '/static/assets/sprites/sandwich-game/sandwich_plan_ground.png'
    )
    this.load.image(
      'btn_left_on',
      '/static/assets/sprites/sandwich-game/btn_left_on.png'
    )
  }

  public create() {
    super.create()
    this.resetClassVariables()
    this.initBackground()
    this.createControls()
  }

  public update(time: number, delta: number): void {
    this.skies!.forEach(sky => {
      sky!.x -= 0.15
    })

    Array.from([
      this.skies,
      this.buildings,
      this.landscapes,
      this.streetLights,
      this.grounds,
    ]).forEach(element => {
      // Loop through props sprites to determine if we have to clone a props to avoid blank
      if (
        element![element!.length - 1].x +
          element![element!.length - 1].width / gameStore.ratioResolution <
        this.game.config.width
      ) {
        if (element === this.skies) {
          this.createCloneBackgroundElement(element!, 'sky')
        } else if (element === this.buildings) {
          this.createCloneBackgroundElement(element!, 'building')
        } else if (element === this.landscapes) {
          this.createCloneBackgroundElement(element!, 'landscape')
        } else if (element === this.streetLights) {
          this.createCloneBackgroundElement(element!, 'streetLights')
        } else if (element === this.grounds) {
          this.createCloneBackgroundElement(element!, 'ground')
        }
      }
    })
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.SandwichPicked, () => {
      gameManager.suspendMinigame()
      this.playWinAnimation()
      this.sandwich!.destroy()
      this.disableMobileControls()
      this.isControlsEnabled = false
    })
  }

  private resetClassVariables(): void {
    this.skies = []
    this.buildings = []
    this.landscapes = []
    this.streetLights = []
    this.grounds = []
    this.isControlsEnabled = true
  }

  private createPlayer = (playerTexture: string): Phaser.GameObjects.Sprite => {
    const sprite = this.add
      .sprite(
        50,
        Number(this.game.config.height) -
          this.grounds![0].height / gameStore.ratioResolution,
        playerTexture
      )
      .setOrigin(0, 1)

    const spriteAnim = sprite.anims.animationManager.get(this.playerTexture)

    if (!!spriteAnim) {
      const [width, height] = [
        spriteAnim.frames[0].frame.width,
        spriteAnim.frames[0].frame.height,
      ]
      sprite.width = width
      sprite.height = height
    }

    sprite.setOrigin(0, 1).setScale(1 / gameStore.ratioResolution)

    return sprite
  }

  private createSandwich = (
    sandwichTexture: string
  ): Phaser.GameObjects.Sprite => {
    const offset = 200
    const sprite = this.add
      .sprite(
        this.grounds![0].x +
          this.grounds![0].width / gameStore.ratioResolution -
          offset,
        Number(this.game.config.height) -
          this.grounds![0].height / gameStore.ratioResolution,
        sandwichTexture
      )
      .setOrigin(1, 1)
      .setScale(1 / gameStore.ratioResolution)

    const spriteAnim = sprite.anims.animationManager.get(this.sandwichTexture)

    if (!!spriteAnim) {
      const [width, height] = [
        spriteAnim.frames[0].frame.width,
        spriteAnim.frames[0].frame.height,
      ]
      sprite.width = width
      sprite.height = height
    }

    return sprite
  }

  private animateGame(): void {
    const speedFactor = 3

    Array.from([
      this.skies,
      this.buildings,
      this.landscapes,
      this.streetLights,
      this.grounds,
    ]).forEach(element => {
      let nativeSpeed = 1

      if (element === this.skies) {
        nativeSpeed = 2
      } else if (element === this.buildings) {
        nativeSpeed = 4
      } else if (element === this.landscapes) {
        nativeSpeed = 5
      } else if (element === this.streetLights) {
        nativeSpeed = 6
      } else if (element === this.grounds) {
        nativeSpeed = 7
      }

      element!.forEach(props => {
        props.x -= nativeSpeed * speedFactor
      })
    })

    this.sandwich!.x -= 7 * speedFactor

    this.player!.anims.play(this.playerTexture, true, this.currentFrame)
    this.player!.anims.stop()

    this.currentFrame += 1

    if (this.currentFrame >= 8) {
      this.currentFrame = 0
    }
  }

  private initBackground(): void {
    this.createBackgroundElement(this.skies!, 'sky')
    this.createBackgroundElement(this.grounds!, 'ground')
    this.createBackgroundElement(this.buildings!, 'building')
    this.createBackgroundElement(this.landscapes!, 'landscape')
    this.createBackgroundElement(this.streetLights!, 'streetLights')

    Array.from(['keydown_LEFT', 'keydown_RIGHT']).forEach(keyCode => {
      this.scene.scene.input.keyboard.on(keyCode, (e: KeyboardEvent) => {
        if (this.lastKeyPressed !== e.keyCode && this.isControlsEnabled) {
          this.animateGame()
          this.lastKeyPressed = e.keyCode as 37 | 39
        }
      })
    })

    this.player = this.createPlayer(this.playerTexture)
    this.player!.anims.play(this.playerTexture, true, 3)
    this.player!.anims.stop()

    this.sandwich = this.createSandwich(this.sandwichTexture)
    this.sandwich!.anims.play(this.sandwichTexture, true, 0)

    Array.from([this.player, this.sandwich]).forEach(element => {
      this.physics.world.enable(element)

      element.setDisplaySize(
        element.width / gameStore.ratioResolution - 1,
        element.height / gameStore.ratioResolution - 1
      )
    })

    const collider = this.physics.add.overlap(
      this.player!,
      this.sandwich,
      () => {
        Emitter.emit(GameEvents.SandwichPicked, this)
        this.physics.world.removeCollider(collider)
      }
    )
  }

  private createBackgroundElement(
    array: Phaser.GameObjects.Sprite[],
    texture: string
  ): void {
    array![0] = this.add
      .sprite(0, Number(this.game.config.height), texture)
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
  }

  private createCloneBackgroundElement(
    array: Phaser.GameObjects.Sprite[],
    texture: string
  ): void {
    array[array.length + 1] = this.add
      .sprite(
        array[0].width / gameStore.ratioResolution,
        Number(this.game.config.height),
        texture
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
  }

  private createControls(): void {
    this.leftBtn = this.add
      .sprite(
        Number(this.game.config.width) / 2,
        Number(this.game.config.height) - 50,
        'btn_left_on'
      )
      .setDepth(1000)
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.leftBtn.x =
      this.leftBtn.x - this.leftBtn.width / gameStore.ratioResolution

    this.rightBtn = this.add
      .sprite(
        Number(this.game.config.width) / 2,
        Number(this.game.config.height) - 50,
        'btn_right_on'
      )
      .setDepth(1000)
      .setOrigin(0.5, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.rightBtn.x =
      this.rightBtn.x + this.rightBtn.width / gameStore.ratioResolution

    Array.from([this.leftBtn, this.rightBtn]).forEach(btn => {
      btn.setInteractive()
      btn.input.hitArea.setSize(btn.width, btn.height)

      btn.on('pointerdown', () => {
        if (this.isControlsEnabled) {
          if (btn === this.leftBtn) {
            this.leftBtn.setTexture('btn_left_off')
            this.rightBtn!.setTexture('btn_right_on')
          } else {
            this.leftBtn!.setTexture('btn_left_on')
            this.rightBtn!.setTexture('btn_right_off')
          }
          this.animateGame()
        }
      })
    })
  }

  private playWinAnimation = async () => {
    return new Promise(resolve => {
      const animation = this.player!.anims.play(this.playerWinTexture, true, 0)

      animation.on('animationcomplete', async () => {
        await gameWait(this.time, 500)
        this.onSuccess()
        resolve()
      })
    })
  }

  private disableMobileControls(): void {
    this.leftBtn!.setTexture('btn_left_off')
    this.rightBtn!.setTexture('btn_right_off')
  }
}
