import { GameCategory } from './enums'

export const minigameSuffix = '_MINIGAME'

export const scenesKeys = {
  Boot: 'BOOT',
  Splashscreen: 'SPLASHSCREEN',
  Homescreen: 'HOMESCREEN',

  SpamGame: 'SPAM' + minigameSuffix,
  ActionSecondGame: 'ACTION_SECOND' + minigameSuffix,
  ActionThirdGame: 'ACTION_THIRD' + minigameSuffix,

  ElevatorFirstGame: 'ELEVATOR_FIRST' + minigameSuffix,
  ElevatorSecondGame: 'ELEVATOR_SECOND' + minigameSuffix,

  PostMinigameScene: 'POSTMINIGAME',

  Deathscreen: 'DEATHSCREEN',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
