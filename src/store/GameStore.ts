import {action, observable} from "mobx";
import {GameState} from "../utils/enums";
import {GameSettings} from "../utils/interfaces";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulity: number = 1
  @observable public paused: boolean = false
  @observable public settings: GameSettings = {volume: 1}
  @observable public ratioResolution: number = 3

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public increaseDifficulty = (): void => {
    this.difficulity++
  }

  @action public changeRatioResolution = (innerWidth: number): void => {
    this.ratioResolution = 2
  }

  @action public togglePause = (): void => {
    this.paused = !this.paused
  }

  @action public pause = (): void => {
    this.paused = true
  }

  @action public resume = (): void => {
    this.paused = false
  }

}

const gameStore = new GameStore()
export default gameStore
