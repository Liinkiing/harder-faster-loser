import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import LeaderboardsTable from './leaderboards/LeaderboardsTable'
import { observer } from 'mobx-react-lite'
import leaderboardsStore from '../../store/LeaderboardsStore'
import LeaderboardsUsernameInput from './leaderboards/LeaderboardsUsernameInput'
import gameStore from '../../store/GameStore'

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

const LeaderboardsScore = styled.h2`
  font-size: 50px;
`

const LeaderboardsUI: FunctionComponent = () => {
  const { timeElapsed, secondsElapsed } = gameStore
  const {
    fetchLeaderboards,
    fetchRankForScore,
    leaderboards,
    rank,
  } = leaderboardsStore
  useEffect(
    () => {
      fetchRankForScore(secondsElapsed)
        .then(fetchLeaderboards)
        .catch(err => console.error(err))
    },
    [secondsElapsed]
  )

  return (
    <LeaderboardsUIInner>
      <h1>Je suis l'ui du leaderboard</h1>
      <LeaderboardsTable userRank={rank} leaderboards={leaderboards} />
      <LeaderboardsScore>{timeElapsed}</LeaderboardsScore>
      <LeaderboardsUsernameInput />
    </LeaderboardsUIInner>
  )
}

export default observer(LeaderboardsUI)
