import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ActionSecondGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ACTION_SECOND_GAME
    });
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }

}
