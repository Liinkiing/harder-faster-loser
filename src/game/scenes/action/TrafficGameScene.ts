import MinigameScene from '../MinigameScene';
import { scenesKeys } from '../../../utils/constants';

export default class TraficGameScene extends MinigameScene {

  constructor() {
    super({
      key: scenesKeys.TrafficGame
    })
  }

  public create() {
    super.create()
  }

  public onFailure = (): void => {
    console.log('you failed')
  }

  public onSuccess = (): void => {
    console.log('you win')
  }

  public update = (time: number, delta: number): void => {}
}