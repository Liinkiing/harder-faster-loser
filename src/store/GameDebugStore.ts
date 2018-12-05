import {action, observable} from "mobx";

class GameDebugStore {

  @observable public debug: boolean = false
  @observable public theme: "dark" | "light" = 'dark'

  @action public showDebug = (): void => {
    this.debug = true
  }

  @action public hideDebug = (): void => {
    this.debug = false
  }

  @action public setTheme = (newTheme: "dark" | "light"): void => {
    this.theme = newTheme
  }

}

const gameDebugStore = new GameDebugStore()
export default gameDebugStore
