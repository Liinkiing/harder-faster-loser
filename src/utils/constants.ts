import { GameCategory } from './enums'

export const scenesKeys = {
  Boot: 'BOOT',
  Splashscreen: 'SPLASHSCREEN',
  Homescreen: 'HOMESCREEN',

  SpamGame: 'MINIGAME',
  ActionSecondGame: 'ACTION_SECOND_GAME',
  ActionThirdGame: 'ACTION_THIRD_GAME',

  ElevatorFirstGame: 'ELEVATOR_FIRST_GAME',
  ElevatorSecondGame: 'ELEVATOR_SECOND_GAME',

  PostMinigameScene: 'POSTMINIGAME',

  Deathscreen: 'DEATHSCREEN',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
