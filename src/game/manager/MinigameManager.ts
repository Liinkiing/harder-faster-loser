import {GameCategory} from "../../utils/enums";
import {categoriesProbability, scenesKeys} from "../../utils/constants";
import {List} from "../../utils/extensions";

interface IGames {
  [category: string]: List<string>,
}

class MinigameManager {

  public currentCategory: GameCategory = GameCategory.Action
  private lastGame?: string

  private games: IGames = {
    [GameCategory.Action]: new List<string>([scenesKeys.SpamGame, scenesKeys.ActionSecondGame, scenesKeys.ActionThirdGame]),
    [GameCategory.Waiting]: new List<string>([scenesKeys.ElevatorFirstGame, scenesKeys.ElevatorSecondGame])
  }

  private playedGames: IGames = {
    [GameCategory.Action]: new List<string>(),
    [GameCategory.Waiting]: new List<string>()
  }

  public pickNextGameKey(): string {
    let selectedCategory: GameCategory;
    selectedCategory = this.pickRandomCategory(Math.random());

    if (this.currentCategory === GameCategory.Waiting && selectedCategory === GameCategory.Waiting) {
      while (selectedCategory === GameCategory.Waiting) {
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


