import { GameCategory, GameState } from '../../utils/enums'
import { categoriesProbability, scenesKeys } from '../../utils/constants'
import { List } from '../../utils/extensions'
import gameManager from './GameManager'
import gameStore from '../../store/GameStore'

interface IGames {
  [category: string]: List<string>
}

class MinigameManager {
  public currentCategory: GameCategory = GameCategory.Action
  public allPlayedGames: Set<string> = new Set()

  private lastGame?: string

  private tutorialGames: IGames = {
    [GameCategory.Action]: new List<string>([
      scenesKeys.SpamGame,
      scenesKeys.SandwichGame,
      scenesKeys.PasswordGame,
      scenesKeys.TrafficGame,
      scenesKeys.ElevatorGame,
    ]),
    [GameCategory.Waiting]: new List<string>([]),
  }

  private games: IGames = {
    [GameCategory.Action]: new List<string>([
      scenesKeys.SpamGame,
      scenesKeys.SandwichGame,
      scenesKeys.PasswordGame,
      scenesKeys.TrafficGame,
      scenesKeys.ElevatorGame,
    ]),
    [GameCategory.Waiting]: new List<string>([]),
  }

  private playedGames: IGames = {
    [GameCategory.Action]: new List<string>(),
    [GameCategory.Waiting]: new List<string>(),
  }

  public addCurrentMinigameToPlayedGames = (): void => {
    if (gameStore.state === GameState.Minigame) {
      this.allPlayedGames.add(gameManager.activeScene!.scene.key)
    }
  }

  public get hasPlayedCurrentMinigame(): boolean {
    if (gameStore.state === GameState.Minigame) {
      return this.allPlayedGames.has(gameManager.activeScene!.scene.key)
    }

    throw new Error('Current scene is not a minigame!')
  }

  public pickNextGameKey(): string {
    if (gameStore.tutorial) {
      if (this.tutorialGames[GameCategory.Action].length > 0) {
        return this.tutorialGames[GameCategory.Action].shift()!
      } else {
        gameStore.stopTutorial()
        return scenesKeys.TutorialScreen
      }
    }
    let selectedCategory: GameCategory
    selectedCategory = this.pickRandomCategory(Math.random())

    if (
      this.currentCategory === GameCategory.Waiting &&
      selectedCategory === GameCategory.Waiting
    ) {
      while (selectedCategory === GameCategory.Waiting) {
        selectedCategory = this.pickRandomCategory(Math.random())
      }
    }

    this.currentCategory = selectedCategory

    return this.pickGameKey(selectedCategory)
  }

  public startGame = async (key: string, force: boolean = false) => {
    let game: string | undefined
    let category: string | undefined

    if (force) {
      this.lastGame = key
      return gameManager.startScene(key)
    }

    for (const gameCategory in this.games) {
      if (this.games.hasOwnProperty(gameCategory)) {
        game = this.games[gameCategory].find(gameKey => gameKey === key)
        if (game) {
          category = gameCategory
        }
      }
    }

    if (category && key) {
      if (this.playedGames[category].length === this.games[category].length) {
        this.playedGames[category].clear()
      }

      if (!this.playedGames[category].has(key)) {
        this.playedGames[category].push(key)
      } else {
        key = this.games[category].random()
      }

      if (this.lastGame && this.lastGame === key) {
        while (key === this.lastGame) {
          key = this.games[category].random()
        }
      }

      this.lastGame = key

      await gameManager.startScene(key)
    }
  }

  public pickGameKey(category: GameCategory): string {
    let game = this.games[category].random()

    if (this.playedGames[category].length === this.games[category].length) {
      this.playedGames[category].clear()
    }

    if (!this.playedGames[category].has(game)) {
      this.playedGames[category].push(game)
    } else {
      game = this.games[category].random()
    }

    if (this.lastGame && this.lastGame === game) {
      while (game === this.lastGame) {
        game = this.games[category].random()
      }
    }

    this.lastGame = game
    return game
  }

  private pickRandomCategory(random: number): GameCategory {
    if (
      this.games[GameCategory.Waiting].length > 0 &&
      random < categoriesProbability[GameCategory.Waiting]
    ) {
      return GameCategory.Waiting
    } else if (
      this.games[GameCategory.Action].length > 0 &&
      random >= categoriesProbability[GameCategory.Waiting] &&
      categoriesProbability[GameCategory.Action]
    ) {
      return GameCategory.Action
    }

    return GameCategory.Action
  }
}

const minigameManager = new MinigameManager()

export default minigameManager
