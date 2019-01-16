import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { LeaderboardsEntry as Entry } from '../../../client/HFLApiClient'
import gameStore from '../../../store/GameStore'
import { red } from '../../../utils/colors'

interface Props {
  entry: Entry & { local: boolean }
}

const LeaderboardsEntryInner = styled.tr<Props>`
  ${({ entry }) => entry.local && `color: ${red};`}
`

const LeaderboardsEntry: FunctionComponent<Props> = props => {
  const {
    entry: { rank, score, username },
  } = props
  return (
    <LeaderboardsEntryInner {...props}>
      <td>{rank}</td>
      <td>{username}</td>
      <td>{gameStore.getTimeElapsedForSeconds(score)}</td>
    </LeaderboardsEntryInner>
  )
}

export default LeaderboardsEntry
