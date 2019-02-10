export enum GameCategory {
  Action = 'ACTION',
  Waiting = 'WAITING',
}

export enum GameState {
  Splashscreen = 'SPLASHSCREEN',
  Introduction = 'INTRODUCTION',
  Homescreen = 'HOMESCREEN',
  Minigame = 'MINIGAME',
  PostMinigame = 'POSTMINIGAME',
  Deathscreen = 'DEATHSCREEN',
  Leaderboards = 'LEADERBOARDS',
}

export enum BaseEvents {
  SceneInit = 'SCENE_INIT',
  SceneCreated = 'SCENE_CREATED',
  SceneDestroyed = 'SCENE_DESTROYED',
}

export enum UIEvents {
  NewContentAvailable = 'NEW_CONTENT_AVAILABLE',
  ContentCached = 'CONTENT_CACHED',

  NotificationShow = 'NOTIFICATION_SHOW',
  NotificationHide = 'NOTIFICATION_HIDE',
}

export enum GameEvents {
  MinigameSuccess = 'MINIGAME_SUCCESS',
  MinigameFailure = 'MINIGAME_FAILURE',

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
