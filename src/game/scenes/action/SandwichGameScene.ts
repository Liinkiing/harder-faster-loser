import { scenesKeys } from '../../../utils/constants'
import BaseScene from '../BaseScene'
import { List } from '../../../utils/extensions'
import { GameEvents } from '../../../utils/enums'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import gameStore from '../../../store/GameStore'
import { gameConfig } from '../../../utils/game'

export default class SandwichGameScene extends MinigameScene {
  private sky?: Phaser.GameObjects.Sprite
  private building?: Phaser.GameObjects.Sprite
  private landscape?: Phaser.GameObjects.Sprite
  private streetLights?: Phaser.GameObjects.Sprite
  private grounds?: Array<Phaser.GameObjects.Sprite> = []
  private lastKeyPressed?: 37 | 39

  constructor() {
    super({
      key: scenesKeys.SandwichGame,
    })
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

  public update(time: number, delta: number): void {}

  public animateBackground() {
    this.sky!.x -= 2
    this.building!.x -= 4
    this.landscape!.x -= 5
    this.streetLights!.x -= 6
    this.grounds!.forEach(ground => {
      ground.x -= 7
    })
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
          this.animateBackground()
          this.lastKeyPressed = e.keyCode as 37 | 39
          console.log('fdp')
        }
      })
    })
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.restartActiveScene()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.restartActiveScene()
  }
}

/**
 * Mettre background
 * Mettre le sprite animé
 * Mettre les bouton pour faire avancer le perso
 * Ajouter le sandiwch
 * Gerer la colision avec le perso pour determiner l'event de victoire
 */
