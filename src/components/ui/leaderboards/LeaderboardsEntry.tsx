import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { LeaderboardsEntry as Entry } from '../../../client/HFLApiClient'
import gameStore from '../../../store/GameStore'

interface Props {
  entry: Entry
}

const LeaderboardsEntryInner = styled.tr``

const LeaderboardsEntry: FunctionComponent<Props> = props => {
  const { entry } = props
  return (
    <LeaderboardsEntryInner>
      <td>{entry.rank}</td>
      <td>{entry.username}</td>
      <td>{gameStore.getTimeElapsedForSeconds(entry.score)}</td>
    </LeaderboardsEntryInner>
  )
}

export default LeaderboardsEntry
