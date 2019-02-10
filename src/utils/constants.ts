import { GameCategory } from './enums'

export const minigameSuffix = '_MINIGAME'
export const minigameToolbarHeight = 84

export const BUTTON_VIBRATION_DURATION = 30

export const scenesKeys = {
  Boot: 'BOOT',
  Splashscreen: 'SPLASHSCREEN',
  Homescreen: 'HOMESCREEN',
  Introduction: 'INTRODUCTION',

  SandwichGame: 'SANDWICH' + minigameSuffix,
  SpamGame: 'SPAM' + minigameSuffix,
  PasswordGame: 'PASSWORD' + minigameSuffix,
  ElevatorGame: 'ELEVATOR' + minigameSuffix,
  TrafficGame: 'TRAFFIC' + minigameSuffix,
  SubwayGame: 'SUBWAY' + minigameSuffix,

  PostMinigameScene: 'POSTMINIGAME',

  Deathscreen: 'DEATHSCREEN',
  Leaderboards: 'LEADERBOARDS',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
