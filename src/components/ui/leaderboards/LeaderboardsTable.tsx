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

const LeaderboardsTableInner = styled.table``

const LeaderboardsTable: FunctionComponent<Props> = props => {
  const { addUserToLeaderboards } = leaderboardsStore
  const { secondsElapsed } = gameStore
  const { leaderboards, userRank } = props
  useEffect(
    () => {
      if (userRank) {
        addUserToLeaderboards(userRank, secondsElapsed)
      }
    },
    [userRank]
  )

  return (
    <LeaderboardsTableInner>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
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
