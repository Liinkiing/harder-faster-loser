import {action, computed, observable} from "mobx";
import {GameDebugTheme} from "../utils/interfaces";

class GameDebugStore {

  @observable public debug: boolean = false
  @observable public theme: GameDebugTheme = GameDebugTheme.Dark

  @action public showDebug = (): void => {
    this.debug = true
  }

  @action public hideDebug = (): void => {
    this.debug = false
  }

  @action public setTheme = (newTheme: GameDebugTheme): void => {
    this.theme = newTheme
  }

  @action public toggleTheme = (): void => {
    this.theme = this.theme === GameDebugTheme.Dark ?
      GameDebugTheme.Light :
      GameDebugTheme.Dark
  }

  @computed get isDarkTheme(): boolean {
    return this.theme === GameDebugTheme.Dark
  }

  @computed get shortThemeName(): string {
    return this.theme[0].toUpperCase()
  }

  @computed get otherThemeName(): string {
    return this.theme === GameDebugTheme.Dark ?
      GameDebugTheme.Light :
      GameDebugTheme.Dark
  }

}

const gameDebugStore = new GameDebugStore()
export default gameDebugStore
