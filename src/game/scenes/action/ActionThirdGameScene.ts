import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ActionThirdGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.ACTION_THIRD_GAME
    });
  }

  public init(): void {
    console.log('INIT ' + scenesKeys.ACTION_THIRD_GAME)
    this.scene.start(minigameManager.pickNextGameKey())
  }

}
