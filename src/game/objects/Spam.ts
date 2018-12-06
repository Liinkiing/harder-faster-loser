import {SpriteConstructor} from "../../utils/interfaces";
import gameStore from '../../store/GameStore';

export default class Spam extends Phaser.GameObjects.Sprite {

  constructor(params: SpriteConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);

    this.setOrigin(0, 0);  

    // Handle cases where a part of the spam is out of the screen
    if (this.x > (window.innerWidth - this.width/gameStore.ratioResolution)) {
      this.x = this.x - this.width/gameStore.ratioResolution
    }

    if (this.y > (window.innerHeight - this.height/gameStore.ratioResolution)) {
      this.y = this.y - this.height/gameStore.ratioResolution
    }

    params.scene.add.existing(this);

    /**
     * Peut être à refacto. 
     * On change le scale du coup on est obligé de divisé la largeur
     */

    const close = this.scene.add.image(this.x , this.y, 'close').setOrigin(0,0).setScale(1/gameStore.ratioResolution, 1/gameStore.ratioResolution)
    close.x = this.x + this.width/gameStore.ratioResolution - close.width/gameStore.ratioResolution
  }

}
