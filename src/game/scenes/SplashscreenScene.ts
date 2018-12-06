import {scenesKeys} from "../../utils/constants";
import {wait} from "../../utils/functions";
import gameManager from "../manager/GameManager";
import BaseScene from "./BaseScene";

export default class SplashscreenScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Splashscreen
    });
  }

  public async init() {
    super.init()
    await wait(3000)
    gameManager.loadHomescreen()
  }
}
