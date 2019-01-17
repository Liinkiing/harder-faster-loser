import { action, observable } from 'mobx'
import HFLApiClient, { Leaderboards } from '../client/HFLApiClient'

const MAX_ITEMS = 10

class LeaderboardStore {
  @observable public leaderboards: Leaderboards = []
  @observable public username: string[] = 'AAA'.split('')
  @observable public rank?: number

  constructor(private client: HFLApiClient) {}

  @action public changeUsername = (index: number, char: string): void => {
    this.username[index] = char
    this.changeLocalUserLeaderboards(this.username.join(''))
  }

  @action public changeLocalUserLeaderboards = (username: string): void => {
    this.leaderboards = this.leaderboards.map(entry => {
      if (entry.local) {
        entry.username = username
      }
      return entry
    })
  }

  @action public addUserToLeaderboards = (
    userRank: number,
    score: number
  ): void => {
    const username = this.username.join('')
    this.leaderboards.splice(userRank - 1, 0, {
      rank: userRank,
      score,
      username,
      spacer: false,
      local: true,
    })
    this.leaderboards = this.leaderboards.map(entry => {
      if (entry.rank >= userRank && !entry.local) {
        entry.rank++
      }
      return entry
    })
    const last = this.leaderboards[this.leaderboards.length - 1]
    if (
      userRank <= MAX_ITEMS &&
      !last.local &&
      this.leaderboards.length > MAX_ITEMS
    ) {
      this.leaderboards.splice(-1, 1)
    }
    if (
      this.leaderboards.length >= 2 &&
      last.local &&
      last.rank >= MAX_ITEMS &&
      this.leaderboards[this.leaderboards.length - 2].rank + 1 !== last.rank
    ) {
      this.leaderboards.splice(-1, 0, {
        rank: -1,
        local: false,
        spacer: true,
        score: -1,
        username: '...',
      })
    }
  }

  @action public fetchLeaderboards = async () => {
    this.leaderboards = (await this.client.getAllLeaderboards(MAX_ITEMS)).map(
      entry => ({ ...entry, local: false, spacer: false })
    )
  }

  @action public fetchRankForScore = async (score: number) => {
    this.rank = (await this.client.getRankForScore(
      Number(score.toFixed(0))
    )).rank
  }

  @action public postHighscore = async (username: string, score: number) => {
    await this.client.createNewPlayer(username, score)
  }
}

const leaderboardsStore = new LeaderboardStore(new HFLApiClient())
export default leaderboardsStore
