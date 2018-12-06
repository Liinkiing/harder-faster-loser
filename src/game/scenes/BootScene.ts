import {scenesKeys} from "../../utils/constants";
import gameManager from "../manager/GameManager";
import BaseScene from "./BaseScene";

export default class BootScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Boot
    });
  }

  public create(): void {
    gameManager.loadSplashscreen()
  }

}
