import { action, observable } from 'mobx'
import HFLApiClient, { Leaderboards } from '../client/HFLApiClient'

class LeaderboardStore {
  @observable public leaderboards: Leaderboards = []

  constructor(private client: HFLApiClient) {}

  @action public fetchLeaderboards = async () => {
    this.leaderboards = await this.client.getAllLeaderboards()
  }
}

const leaderboardsStore = new LeaderboardStore(new HFLApiClient())
export default leaderboardsStore
