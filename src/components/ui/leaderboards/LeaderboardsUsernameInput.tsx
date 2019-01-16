import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import LeaderboardsUsernameInputBlock from './LeaderboardsUsernameInputBlock'

const LeaderboardsUsernameInputInner = styled.div`
  display: flex;
`

const LeaderboardsUsernameInput: FunctionComponent = props => {
  return (
    <LeaderboardsUsernameInputInner>
      <LeaderboardsUsernameInputBlock />
      <LeaderboardsUsernameInputBlock />
      <LeaderboardsUsernameInputBlock />
    </LeaderboardsUsernameInputInner>
  )
}

export default LeaderboardsUsernameInput
