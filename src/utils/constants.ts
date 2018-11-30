import {GameCategory} from "./enums";

export const scenesKeys = {
  ACTION_FIRST_GAME: 'ActionFirstGameScene',
  ACTION_SECOND_GAME: 'ActionSecondGameScene',
  ACTION_THIRD_GAME: 'ActionThirdGameScene',

  ELEVATOR_FIRST_GAME: 'ElevatorFirstGame',
  ELEVATOR_SECOND_GAME: 'ElevatorSecondGame',
}

export const categoriesProbability = {
  [GameCategory.Action]: 0.9,
  [GameCategory.Waiting]: 0.1,
}
