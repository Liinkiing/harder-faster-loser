import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ElevatorSecondGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ELEVATOR_SECOND_GAME
    });
  }


  public init(): void {
    console.log('INIT ' + scenesKeys.ELEVATOR_SECOND_GAME)
    this.scene.start(minigameManager.pickNextGameKey())
  }
}
