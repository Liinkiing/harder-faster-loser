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
}

export enum BaseEvents {
  SceneInit = 'SCENE_INIT',
  SceneCreated = 'SCENE_CREATED',
}

export enum GameEvents {
  SpamDestroyed = 'SPAM_DESTROYED',
  RemainingTimeOver = 'REMANING_TIME_OVER',
}

export enum GameDebugTheme {
  Light = 'LIGHT',
  Dark = 'DARK',
}
