export enum GameCategory {
  Action = 'ACTION',
  Waiting = 'WAITING',
}

export enum GameState {
  Splashscreen = 'SPLASHSCREEN',
  Homescreen = 'HOMESCREEN',
  Minigame = 'MINIGAME',
  PostMinigame = 'POSTMINIGAME',
  Deathscreen = 'DEATHSCREEN',
  Leaderboards = 'LEADERBOARDS',
}

export enum BaseEvents {
  SceneInit = 'SCENE_INIT',
  SceneCreated = 'SCENE_CREATED',
}

export enum GameEvents {
  KeyboardPasswordButtonClicked = 'KEYBOARD_PASSWORD_BUTTON_CLICKED',
  SpamDestroyed = 'SPAM_DESTROYED',
  RemainingTimeOver = 'REMANING_TIME_OVER',
  SpamClicked = 'SPAM_CLICKED',

  SandwichPicked = 'SANDWICH_PICKED',

  DeathscreenFirstSceneDestroyed = 'DEATH_FIRST_SCENE_DESTROYED',
}

export enum GameDebugTheme {
  Light = 'LIGHT',
  Dark = 'DARK',
}
