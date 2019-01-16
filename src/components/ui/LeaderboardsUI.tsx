import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import LeaderboardsTable from './leaderboards/LeaderboardsTable'
import { observer } from 'mobx-react-lite'
import leaderboardsStore from '../../store/LeaderboardsStore'
import LeaderboardsUsernameInput from './leaderboards/LeaderboardsUsernameInput'

const LeaderboardsUIInner = styled.div`
  background: ${black};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LeaderboardsUI: FunctionComponent = () => {
  const { fetchLeaderboards, leaderboards } = leaderboardsStore
  useEffect(() => {
    fetchLeaderboards().catch(err => console.error(err))
  }, [])

  return (
    <LeaderboardsUIInner>
      <h1>Je suis l'ui du leaderboard</h1>
      <LeaderboardsTable leaderboards={leaderboards} />
      <LeaderboardsUsernameInput />
    </LeaderboardsUIInner>
  )
}

export default observer(LeaderboardsUI)
