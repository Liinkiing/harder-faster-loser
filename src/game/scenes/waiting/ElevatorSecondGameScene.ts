import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ElevatorSecondGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ElevatorSecondGame
    });
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }
}
