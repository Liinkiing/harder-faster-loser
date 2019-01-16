import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import LeaderboardsTable from './leaderboards/LeaderboardsTable'
import { observer } from 'mobx-react-lite'
import leaderboardsStore from '../../store/LeaderboardsStore'
import LeaderboardsUsernameInput from './leaderboards/LeaderboardsUsernameInput'
import gameStore from '../../store/GameStore'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'

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
    postHighscore,
    username,
    leaderboards,
    rank,
  } = leaderboardsStore
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchRankForScore(secondsElapsed)
      .then(fetchLeaderboards)
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [])

  const onSubmit = async () => {
    setLoading(true)
    await postHighscore(username.join(''), secondsElapsed)
    gameManager.restartGame()
  }

  return (
    <LeaderboardsUIInner>
      <LeaderboardsTable userRank={rank} leaderboards={leaderboards} />
      <LeaderboardsScore>{timeElapsed}</LeaderboardsScore>
      <LeaderboardsUsernameInput />
      <GameButton disabled={loading} onClick={onSubmit}>
        Submit
      </GameButton>
    </LeaderboardsUIInner>
  )
}

export default observer(LeaderboardsUI)
