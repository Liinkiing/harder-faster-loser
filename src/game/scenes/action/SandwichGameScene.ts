import { scenesKeys } from '../../../utils/constants'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import gameStore from '../../../store/GameStore'
import AnimatedSprite from './AnimatedSprite'

export default class SandwichGameScene extends MinigameScene {
  private skies?: Phaser.GameObjects.Sprite[] = []
  private building?: Phaser.GameObjects.Sprite
  private landscape?: Phaser.GameObjects.Sprite
  private streetLights?: Phaser.GameObjects.Sprite
  private grounds?: Phaser.GameObjects.Sprite[] = []
  private lastKeyPressed?: 37 | 39
  private playerTexture: string
  private playerWinTexture: string
  private sandwichTexture: string
  private player?: Phaser.GameObjects.Sprite
  private sandwich?: Phaser.GameObjects.Sprite
  private currentFrame: integer = 0
  private isSandwichPicked: boolean = false

  constructor() {
    super({
      key: scenesKeys.SandwichGame,
    })

    this.playerTexture = 'tokiRunAnimation'
    this.playerWinTexture = 'tokiWinAnimation'
    this.sandwichTexture = 'sandwichFlyingAnimation'
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.restartActiveScene()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.restartActiveScene()
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

    /**
     * Need to crop cloud sprite.
     * For the moment, because of the sprite height, when we add 1 new sky, it masks the whole scene (z-index)
     */
    // this.skies!.forEach(sky => {
    //   sky!.x -= 0.1
    // });
    // if (this.skies![this.skies!.length - 1].x + this.skies![this.skies!.length - 1].width / gameStore.ratioResolution < this.game.config.width) {
    //   this.skies![this.skies!.length + 1] = this.add
    //     .sprite(
    //       this.skies![0].width / gameStore.ratioResolution,
    //       Number(this.game.config.height),
    //       'sky'
    //     )
    //     .setOrigin(0, 1)
    //     .setScale(1 / gameStore.ratioResolution)
    // }

    this.physics.add.collider(this.player!, this.sandwich!, () => {
      if (!this.isSandwichPicked) {
        Emitter.emit(GameEvents.SandwichPicked, this)
      }
    })
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.SandwichPicked, () => {
      this.isSandwichPicked = true
      this.player!.anims.play(this.playerWinTexture, true, 0)
      this.onSuccess()
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

    sprite.setOrigin(0, 1).setScale(1 / gameStore.ratioResolution)

    return sprite
  }

  private createSandwich = (
    sandwichTexture: string
  ): Phaser.GameObjects.Sprite => {
    const offset = 200
    const sprite = this.add
      .sprite(
        this.grounds![1].x + this.grounds![1].width / gameStore.ratioResolution - offset,
        Number(this.game.config.height) - this.grounds![0].height / gameStore.ratioResolution,
        sandwichTexture
      )
      .setOrigin(1, 1).setScale(1 / gameStore.ratioResolution)

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
    const speedFactor = 30

    this.skies!.forEach(sky => {
      sky.x -= 2 * speedFactor
    });

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

    const lastGround = this.grounds![this.grounds!.length - 1]

    // If the right of the last ground is in the viewport, we need to add an other ground to avoid blank ground
    if (lastGround.x + lastGround.width / gameStore.ratioResolution < this.game.config.width) {
      this.grounds![this.grounds!.length] = this.add
        .sprite(
          this.grounds![0].width / gameStore.ratioResolution,
          Number(this.game.config.height),
          'ground'
        )
        .setOrigin(0, 1).setScale(1 / gameStore.ratioResolution)
    }
  }

  private initBackground(): void {
    Array.from(['building', 'landscape', 'streetLights']).forEach(
      texture => {
        this[texture] = this.add
          .sprite(0, Number(this.game.config.height), texture)
          .setOrigin(0, 1)
          .setScale(1 / gameStore.ratioResolution)
      }
    )

    this.createSky()
    this.createGround()

    Array.from(['keydown_LEFT', 'keydown_RIGHT']).forEach(keyCode => {
      this.scene.scene.input.keyboard.on(keyCode, (e: KeyboardEvent) => {
        if (this.lastKeyPressed !== e.keyCode) {
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

    this.physics.world.enable(this.player)
    this.physics.world.enable(this.sandwich)

    this.player.setDisplaySize(
      this.player.width / gameStore.ratioResolution - 1,
      this.player.height / gameStore.ratioResolution - 1
    )
  }

  private createSky(): void {
    this.skies![0] = this.add
    .sprite(0, Number(this.game.config.height), 'sky')
    .setOrigin(0, 1)
    .setScale(1 / gameStore.ratioResolution)
  }

  private createGround(): void {
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
  }
}
