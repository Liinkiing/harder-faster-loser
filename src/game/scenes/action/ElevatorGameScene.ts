import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import { scenesKeys } from '../../../utils/constants'
import gameStore from '../../../store/GameStore'
import { GameEvents } from '../../../utils/enums'

export default class ElevatorGameScene extends MinigameScene {
  private playerTexture: string
  private elevator?: Phaser.GameObjects.Sprite

  constructor() {
    super({
      key: scenesKeys.ElevatorGame,
    })

    this.playerTexture = 'tokiWhistleAnimation'
  }

  public onFailure(): void {
    console.log('you failed')
    gameManager.loadNextMinigame()
  }

  public onSuccess(): void {
    console.log('you won')
    gameManager.loadNextMinigame()
  }

  public preload(): void {
    super.preload()
    this.load.image(
      'elevator_bkg',
      '/static/assets/sprites/elevator-game/elevator_bkg.png'
    )
  }

  public create() {
    super.create()
    this.initBackground()
  }

  public update(time: number, delta: number): void {}

  private initBackground(): void {
    this.elevator = this.add
      .sprite(0, Number(this.game.config.height), 'elevator_bkg')
      .setOrigin(0, 1)
      .setScale(1 / gameStore.ratioResolution)
  }
}
