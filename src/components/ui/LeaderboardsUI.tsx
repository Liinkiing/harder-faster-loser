import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import LeaderboardsTable from './leaderboards/LeaderboardsTable'
import { observer } from 'mobx-react-lite'
import leaderboardsStore from '../../store/LeaderboardsStore'
import LeaderboardsUsernameInput from './leaderboards/LeaderboardsUsernameInput'
import gameStore from '../../store/GameStore'
import GameButton from './GameButton'

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
  ${GameButton} {
    margin-top: 30px;
  }
`

const LeaderboardsScore = styled.h2`
  margin-top: 30px;
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
      <LeaderboardsTable userRank={rank} leaderboards={leaderboards} />
      <LeaderboardsScore>{timeElapsed}</LeaderboardsScore>
      <LeaderboardsUsernameInput />
      <GameButton>Submit</GameButton>
    </LeaderboardsUIInner>
  )
}

export default observer(LeaderboardsUI)
