import {ContainerConstructor} from "../../utils/interfaces";
import gameStore from '../../store/GameStore';
import { useKeyboardInput } from '../../utils/hooks';


export default class Spam extends Phaser.GameObjects.Container {

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y, params.children);
    
        
  }

}
