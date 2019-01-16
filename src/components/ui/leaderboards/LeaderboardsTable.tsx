import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Leaderboards } from '../../../client/HFLApiClient'
import LeaderboardsEntry from './LeaderboardsEntry'

interface Props {
  readonly leaderboards: Leaderboards
}

const LeaderboardsTableInner = styled.table``

const LeaderboardsTable: FunctionComponent<Props> = props => {
  const { leaderboards } = props

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
        {leaderboards.map(entry => (
          <LeaderboardsEntry key={entry.rank} entry={entry} />
        ))}
      </tbody>
    </LeaderboardsTableInner>
  )
}

export default LeaderboardsTable
