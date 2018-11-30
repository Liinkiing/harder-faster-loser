import {GameCategory} from "../../utils/enums";
import {categoriesProbability, scenesKeys} from "../../utils/constants";

interface IGames {
  [category: string]: string[],
}

class MinigameManager {

  public currentCategory: GameCategory = GameCategory.Action
  private lastGame?: string

  private games: IGames = {
    [GameCategory.Action]: [scenesKeys.ACTION_FIRST_GAME, scenesKeys.ACTION_SECOND_GAME, scenesKeys.ACTION_THIRD_GAME],
    [GameCategory.Waiting]: [scenesKeys.ELEVATOR_FIRST_GAME, scenesKeys.ELEVATOR_SECOND_GAME]
  }

  private playedGames: IGames = {
    [GameCategory.Action]: [],
    [GameCategory.Waiting]: []
  }

  public pickNextGameKey(): string {
    let selectedCategory: GameCategory;
    selectedCategory = this.pickRandomCategory(Math.random());

    if (this.currentCategory === GameCategory.Waiting && selectedCategory === GameCategory.Waiting) {
      while (selectedCategory === GameCategory.Waiting) {
        console.log('fdp')
        selectedCategory = this.pickRandomCategory(Math.random())
      }
    }

    this.currentCategory = selectedCategory

    return this.pickGameKey(selectedCategory)

  }

  public pickGameKey(category: GameCategory): string {
    console.log('picking ' + category)
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
    if (random < categoriesProbability[GameCategory.Waiting]) {
      return GameCategory.Waiting
    } else if (random >= categoriesProbability[GameCategory.Waiting] && categoriesProbability[GameCategory.Action]) {
      return GameCategory.Action
    }

    return GameCategory.Action
  }

}

const minigameManager = new MinigameManager()

export default minigameManager


