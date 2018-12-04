import {GameCategory} from "./enums";

export const scenesKeys = {
  Boot: 'BootScene',
  Splashscreen: 'SplashscreenScene',

  ActionFirstGame: 'ActionFirstGameScene',
  ActionSecondGame: 'ActionSecondGameScene',
  ActionThirdGame: 'ActionThirdGameScene',

  ElevatorFirstGame: 'ElevatorFirstGame',
  ElevatorSecondGame: 'ElevatorSecondGame',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
