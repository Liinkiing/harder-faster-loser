import { scenesKeys } from '../../../utils/constants'
import BaseScene from '../BaseScene'
import { List } from '../../../utils/extensions'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import gameStore from '../../../store/GameStore'
import { gameConfig } from '../../../utils/game'
import AnimatedSprite from './AnimatedSprite'

export default class SandwichGameScene extends MinigameScene {
  private sky?: Phaser.GameObjects.Sprite
  private building?: Phaser.GameObjects.Sprite
  private landscape?: Phaser.GameObjects.Sprite
  private streetLights?: Phaser.GameObjects.Sprite
  private grounds?: Array<Phaser.GameObjects.Sprite> = []
  private lastKeyPressed?: 37 | 39
  private playerTexture: string
  private playerWinTexture: string
  private sandwichTexture: string
  private player?: Phaser.GameObjects.Sprite
  private sandwich?: Phaser.GameObjects.Sprite
  private currentFrame: integer = 0
  private isSandwichPicked: Boolean = false

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
  }

  public create() {
    super.create()
    this.initBackground()
  }

  public update(time: number, delta: number): void {
    this.physics.add.collider(this.player!, this.sandwich!, () => {
      if (!this.isSandwichPicked) {
        Emitter.emit(GameEvents.SandwichPicked, this)
      }
    })
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

    sprite.setScale(1 / gameStore.ratioResolution)

    return sprite
  }

  private createSandwich = (
    sandwichTexture: string
  ): Phaser.GameObjects.Sprite => {
    const sprite = this.add
      .sprite(
        this.grounds![this.grounds!.length - 1].x +
          this.grounds![1].width / gameStore.ratioResolution -
          200,
        Number(this.game.config.height) -
          this.grounds![0].height / gameStore.ratioResolution,
        sandwichTexture
      )
      .setOrigin(1, 1)

    const spriteAnim = sprite.anims.animationManager.get(this.sandwichTexture)

    if (!!spriteAnim) {
      const [width, height] = [
        spriteAnim.frames[0].frame.width,
        spriteAnim.frames[0].frame.height,
      ]
      sprite.width = width
      sprite.height = height
    }

    sprite.setScale(1 / gameStore.ratioResolution)

    return sprite
  }

  public animateGame(): void {
    const speedFactor = 20
    this.sky!.x -= 2 * speedFactor
    this.building!.x -= 4 * speedFactor
    this.landscape!.x -= 5 * speedFactor
    this.streetLights!.x -= 6 * speedFactor
    this.grounds!.forEach(ground => {
      ground.x -= 7 * speedFactor
    })
    this.sandwich!.x -= 7 * speedFactor

    this.player!.anims.play(this.playerTexture, true, this.currentFrame)
    this.player!.anims.stop()

    this.currentFrame += 1

    if (this.currentFrame >= 9) {
      this.currentFrame = 0
    }
  }

  public initBackground(): void {
    Array.from(['sky', 'building', 'landscape', 'streetLights']).forEach(
      texture => {
        this[texture] = this.add
          .sprite(0, Number(this.game.config.height), texture)
          .setOrigin(0, 1)
          .setScale(1 / gameStore.ratioResolution)
      }
    )

    this.grounds![0] = this.add
      .sprite(0, Number(this.game.config.height), 'ground')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    this.grounds![1] = this.add
      .sprite(
        this.grounds![0].width / gameStore.ratioResolution,
        Number(this.game.config.height),
        'ground'
      )
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)

    Array.from(['keydown_LEFT', 'keydown_RIGHT']).forEach(keyCode => {
      this.scene.scene.input.keyboard.on(keyCode, (e: KeyboardEvent) => {
        if (this.lastKeyPressed != e.keyCode) {
          this.animateGame()
          this.lastKeyPressed = e.keyCode as 37 | 39
        }
      })
    })

    this.player = this.createPlayer(this.playerTexture)
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.player!.anims.play(this.playerTexture, true, 3)
    this.player!.anims.stop()

    this.sandwich = this.createSandwich(this.sandwichTexture)
      .setOrigin(1, 1)
      .setScale(1 / gameStore.ratioResolution)
    this.sandwich!.anims.play(this.sandwichTexture, true, 0)

    /**
     * Physics stuff
     */
    this.physics.world.enable(this.player)
    this.physics.world.enable(this.sandwich)

    this.player.setDisplaySize(
      84,
      this.player.height / gameStore.ratioResolution
    )
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.restartActiveScene()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.restartActiveScene()
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.SandwichPicked, () => {
      console.log('test')
      this.isSandwichPicked = true
      this.player!.anims.play(this.playerWinTexture, true, 0)
      this.onSuccess()
    })
  }
}
