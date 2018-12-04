import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ElevatorFirstGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ElevatorFirstGame
    });
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }}
