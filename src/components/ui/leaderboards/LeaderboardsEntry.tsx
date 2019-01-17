import * as React from 'react'
import { FunctionComponent } from 'react'
import styled, { css } from 'styled-components'
import { LeaderboardsEntry as Entry } from '../../../client/HFLApiClient'
import gameStore from '../../../store/GameStore'
import { pink, white } from '../../../utils/colors'

interface Props {
  entry: Entry & { local: boolean }
}

const LeaderboardsEntryInner = styled.tr<Props>`
  text-transform: uppercase;
  pointer-events: all;
  ${({ entry }) =>
    entry.local &&
    css`
      height: 30px;
      line-height: 30px;
      color: ${pink};
      background: ${white};
      & td {
        padding: 0;
        margin: 0;
      }
    `};
`

const LeaderboardsEntry: FunctionComponent<Props> = props => {
  const {
    entry: { rank, score, username, spacer },
  } = props
  return (
    <LeaderboardsEntryInner {...props}>
      {!spacer ? (
        <>
          <td>{rank}</td>
          <td>{username}</td>
          <td>{gameStore.getTimeElapsedForSeconds(score)}</td>
        </>
      ) : (
        <>
          <td />
          <td>...</td>
          <td />
        </>
      )}
    </LeaderboardsEntryInner>
  )
}

export default styled(LeaderboardsEntry)``
