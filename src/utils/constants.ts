import { GameCategory } from './enums'

export const scenesKeys = {
  Boot: 'BOOT_SCENE',
  Splashscreen: 'SPLASHSCREEN_SCENE',
  Homescreen: 'HOMESCREEN_SCENE',

  SpamGame: 'SPAM_GAME_SCENE',
  ActionSecondGame: 'ACTION_SECOND_GAME_SCENE',
  ActionThirdGame: 'ACTION_THIRD_GAME_SCENE',

  ElevatorFirstGame: 'ELEVATOR_FIRST_GAME',
  ElevatorSecondGame: 'ELEVATOR_SECOND_GAME_SCENE',

  PostMinigameScene: 'POST_MINIGAME_SCENE',

  Deathscreen: 'DEATHSCREEN_SCENE',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
