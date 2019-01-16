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
      <LeaderboardsUsernameInputBlock usernameIndex={0} />
      <LeaderboardsUsernameInputBlock usernameIndex={1} />
      <LeaderboardsUsernameInputBlock usernameIndex={2} />
    </LeaderboardsUsernameInputInner>
  )
}

export default LeaderboardsUsernameInput
