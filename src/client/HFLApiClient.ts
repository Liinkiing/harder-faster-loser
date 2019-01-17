import querystring from 'querystring'

const AUTH_HEADER = 'X-AUTH-TOKEN'

type LeaderboardsAllResponse = Array<{
  score: number
  username: string
  rank: number
}>

export type Leaderboards = Array<
  LeaderboardsAllResponse[0] & { local: boolean; spacer: boolean }
>

export type LeaderboardsEntry = Leaderboards[0]

interface PlayerNewResponse {
  score: number
  username: string
  rank: number
}

export type Player = PlayerNewResponse

interface LeaderboardsRankResponse {
  rank: number
}

export type LeaderboardsRank = LeaderboardsRankResponse

export default class HFLApiClient {
  private baseUri: string = process.env.REACT_APP_API_URL || ''
  private token: string = process.env.REACT_APP_API_TOKEN || ''

  constructor() {
    if (this.baseUri === '') {
      throw new Error(
        'Could not fetch API. Base URI is missing! Please check that your env vars contains a "REACT_APP_API_URL"'
      )
    }
    if (this.token === '') {
      throw new Error(
        'Could not get API token. Please check that your env vars contains a "REACT_APP_API_TOKEN"'
      )
    }
  }

  public getRankForScore = async (score: number): Promise<LeaderboardsRank> =>
    (await this.get(`/leaderboards/rank/${score}`)).json()

  public getAllLeaderboards = async (
    first: number = 10
  ): Promise<LeaderboardsAllResponse> =>
    (await this.get('/leaderboards/all', { first })).json()

  public createNewPlayer = async (
    username: string,
    score: number
  ): Promise<PlayerNewResponse> =>
    (await this.post('/player/new', { username, score })).json()

  public checkStatus = async (): Promise<{ status: 'online' }> =>
    (await this.get('/status/check')).json()

  private prepare = (request: Request): this => {
    request.headers.set('Accept', 'application/json')
    request.headers.set('Content-Type', 'application/json')
    this.auth(request)

    return this
  }

  private get = async (endpoint: string, query?: object) => {
    const request = new Request(
      `${this.baseUri}${endpoint}` +
        (query ? '?' + querystring.stringify(query) : '')
    )
    this.prepare(request)

    return await fetch(request)
  }

  private post = async (endpoint: string, body: object, query?: object) => {
    const request = new Request(
      `${this.baseUri}${endpoint}` +
        (query ? '?' + querystring.stringify(query) : ''),
      { method: 'POST', body: JSON.stringify(body) }
    )
    this.prepare(request)

    return await fetch(request)
  }

  private auth = (request: Request) => {
    request.headers.set(AUTH_HEADER, this.token)
  }
}
