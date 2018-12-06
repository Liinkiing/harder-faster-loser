import {scenesKeys} from "../../utils/constants";
import BaseScene from "./BaseScene";

export default class HomescreenScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Homescreen
    });
  }

}
