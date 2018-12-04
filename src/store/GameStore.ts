import {action, observable} from "mobx";
import {GameState} from "../utils/enums";
import {GameSettings} from "../utils/interfaces";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen
  @observable public settings: GameSettings = {volume: 1}

  @action public changeState = (newState: GameState) => {
    this.state = newState
  }

}

const gameStore = new GameStore()
export default gameStore
