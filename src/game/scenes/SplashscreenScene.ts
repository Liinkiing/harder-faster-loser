import {scenesKeys} from "../../utils/constants";
import BaseScene from "./BaseScene";

export default class SplashscreenScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Splashscreen
    });
  }

}
