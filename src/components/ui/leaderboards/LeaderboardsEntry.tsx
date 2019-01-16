import * as React from 'react'
import { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import { LeaderboardsEntry as Entry } from '../../../client/HFLApiClient'
import gameStore from '../../../store/GameStore'
import { red } from '../../../utils/colors'
import { blink } from '../../../utils/keyframes'

interface Props {
  entry: Entry & { local: boolean }
}

const LeaderboardsEntryInner = styled.tr<Props>`
  text-transform: uppercase;
  ${({ entry }) => entry.local && `color: ${red};`};
  ${({ entry }) =>
    entry.local &&
    css`
      animation: ${blink} 2s alternate-reverse infinite ease-in-out;
    `};
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
