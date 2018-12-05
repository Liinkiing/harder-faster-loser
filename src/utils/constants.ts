import {GameCategory} from "./enums";

export const scenesKeys = {
  Boot: 'BootScene',
  Splashscreen: 'SplashscreenScene',
  Homescreen: 'HomescreenScene',

  ActionFirstGame: 'ActionFirstGameScene',
  ActionSecondGame: 'ActionSecondGameScene',
  ActionThirdGame: 'ActionThirdGameScene',

  ElevatorFirstGame: 'ElevatorFirstGame',
  ElevatorSecondGame: 'ElevatorSecondGame',

  PostMinigameScene: 'PostMinigameScene',

  Deathscreen: 'DeathscreenScene'
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
