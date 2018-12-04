import {observable} from "mobx";
import {GameState} from "../utils/enums";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen

}

const gameStore = new GameStore()
export default gameStore
