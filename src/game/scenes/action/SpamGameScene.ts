import { scenesKeys } from "../../../utils/constants";
import BaseScene from "../BaseScene";
import Spam from "../../objects/Spam";
import { List } from "../../../utils/extensions";
import { randomRange } from "../../../utils/functions";
import gameStore from '../../../store/GameStore';
import { useKeyboardInput } from "../../../utils/hooks";
import { Key } from 'ts-key-enum';
import SpamContent from '../../objects/SpamContent';

export default class SpamGameScene extends BaseScene {

  public spams: Phaser.GameObjects.Container[] = new List<Phaser.GameObjects.Container>()
  public spam?: Spam
  public counter: number = 0

  constructor() {
    super({
      key: scenesKeys.SpamGame
    });
  }

  public preload(): void {
    this.load.pack(
      'preload',
      '/assets/sprites/spam-game/pack.json',
      'preload'
    )

    this.load.image('close', '/assets/sprites/spam-game/CLOSE.png')
    this.load.image('sprite', '/assets/sprites/spam-game/sp_1.png')
  }

  public create(): void {
    const availablesSpam = new List<string>(["sp_1", "sp_2", "sp_3", "sp_4_1", "sp_5_1", "sp_6_1"])
    
    for (let i = 0; i < 10; i++) {
      const handleTimout = () => {

        const container = this.add.container(randomRange(0, window.innerWidth), randomRange(0, window.innerHeight)).setScale(0.5, 0.5)
        const close = this.add.sprite(0, 0, 'close').setOrigin(0, 0)

        const sprite = new SpamContent({
          scene: this,
          x: 0,
          y: 0,
          texture: availablesSpam.random()
        })

        container.add(sprite)
        container.add(close)

        if (container.x > (window.innerWidth - sprite.width/gameStore.ratioResolution)) {
          container.x = container.x - sprite.width/gameStore.ratioResolution
        }
    
        if (container.y > (window.innerHeight - sprite.height/gameStore.ratioResolution)) {
          container.y = container.y - sprite.height/gameStore.ratioResolution
        }
        
        this.spams.push(container)
        
      }

      setTimeout(handleTimout, i * 500)
    }
  }

  public update(time: number, delta: number): void {
    // this.spams.forEach(spam => spam.update(time, delta))

  }
}
