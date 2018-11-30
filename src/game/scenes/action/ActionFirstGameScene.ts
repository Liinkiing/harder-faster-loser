import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ActionFirstGameScene extends Phaser.Scene {

  constructor() {
    super({
      key: scenesKeys.ACTION_FIRST_GAME
    });
  }

  public init(): void {
    console.log('INIT ' + scenesKeys.ACTION_FIRST_GAME)
    this.scene.start(minigameManager.pickNextGameKey())
  }
}
