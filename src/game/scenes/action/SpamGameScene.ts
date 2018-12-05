import {scenesKeys} from "../../../utils/constants";
import BaseScene from "../BaseScene";
import Spam from "../../objects/Spam";
import {List} from "../../../utils/extensions";

export default class SpamGameScene extends BaseScene {

  public spams?: List<Spam>

  constructor() {
    super({
      key: scenesKeys.SpamGame
    });
  }

  public preload(): void {
  }

  public create(): void {

  }

}
