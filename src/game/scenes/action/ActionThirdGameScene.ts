import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ActionThirdGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ACTION_THIRD_GAME
    });
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }

}
