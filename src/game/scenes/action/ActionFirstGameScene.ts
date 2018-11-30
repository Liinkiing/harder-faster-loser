import {scenesKeys} from "../../../utils/constants";
import minigameManager from "../../manager/MinigameManager";

export default class ActionFirstGameScene extends Phaser.Scene {

  constructor() {
    super({
      key: scenesKeys.ACTION_FIRST_GAME
    });
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }
}
