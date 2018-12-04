import {scenesKeys} from "../../../utils/constants";

export default class ActionFirstGameScene extends Phaser.Scene {

  constructor() {
    super({
      key: scenesKeys.ActionFirstGame
    });
  }

  public init(): void {
    console.log("FIRST GAME INIT")
    // this.scene.start(minigameManager.pickNextGameKey())
  }
}
