import { action, computed, observable } from 'mobx'
import { GameDebugTheme } from '../utils/enums'

class GameDebugStore {
  @observable public debug: boolean = false
  @observable public debugToolbar: boolean = true
  @observable public theme: GameDebugTheme = GameDebugTheme.Light

  @action public showDebugToolbar = (): void => {
    this.debugToolbar = true
    this.showDebug()
  }

  @action public hideDebugToolbar = (): void => {
    this.debugToolbar = false
    this.hideDebug()
  }

  @action public toggleDebugToolbar = (): void => {
    this.debugToolbar = !this.debugToolbar
    this.debug = this.debugToolbar
  }

  @action public toggleDebug = (): void => {
    this.debug = !this.debug
  }

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
    this.theme =
      this.theme === GameDebugTheme.Dark
        ? GameDebugTheme.Light
        : GameDebugTheme.Dark
  }

  @computed get isDarkTheme(): boolean {
    return this.theme === GameDebugTheme.Dark
  }

  @computed get shortThemeName(): string {
    return this.theme[0].toUpperCase()
  }

  @computed get otherThemeName(): string {
    return this.theme === GameDebugTheme.Dark
      ? GameDebugTheme.Light
      : GameDebugTheme.Dark
  }
}

const gameDebugStore = new GameDebugStore()
export default gameDebugStore
