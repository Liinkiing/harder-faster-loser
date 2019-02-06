import * as React from 'react'
import { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { Leaderboards } from '../../../client/HFLApiClient'
import LeaderboardsEntry from './LeaderboardsEntry'
import leaderboardsStore from '../../../store/LeaderboardsStore'
import { observer } from 'mobx-react-lite'
import gameStore from '../../../store/GameStore'

interface Props {
  readonly leaderboards: Leaderboards
  readonly userRank?: number
}

const LeaderboardsTableInner = styled.table`
  width: 80%;
  text-align: center;
  max-width: 500px;
  border-collapse: separate;
  border-spacing: 0 2px;
  & thead tr th:first-of-type {
    text-align: left;
    padding-left: 10px;
  }
  & thead tr th:last-of-type {
    text-align: right;
    padding-right: 10px;
  }
  ${LeaderboardsEntry} {
    td:first-of-type {
      padding-left: 10px;
      text-align: left;
      max-width: 40px;
    }
    td:last-of-type {
      padding-right: 10px;
      text-align: right;
    }
  }
`

const LeaderboardsTable: FunctionComponent<Props> = props => {
  const { addUserToLeaderboards } = leaderboardsStore
  const { score } = gameStore
  const { leaderboards, userRank } = props
  useEffect(() => {
    if (userRank && userRank !== 0) {
      addUserToLeaderboards(userRank, score.current)
    }
  }, [])

  return (
    <LeaderboardsTableInner>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboards.map((entry, index) => (
          <LeaderboardsEntry key={index} entry={entry} />
        ))}
      </tbody>
    </LeaderboardsTableInner>
  )
}

export default observer(LeaderboardsTable)
