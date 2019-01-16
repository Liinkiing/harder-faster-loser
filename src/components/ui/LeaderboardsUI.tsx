import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
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
  const [error, setError] = useState<string | null>(null)
  const fetchResults = useCallback(
    () => {
      if (secondsElapsed > 0) {
        setLoading(true)
        fetchRankForScore(secondsElapsed)
          .then(fetchLeaderboards)
          .then(() => {
            setLoading(false)
            setError(null)
          })
          .catch(() => {
            setLoading(false)
            setError('Could not fetch leaderboards!')
          })
      }
    },
    [secondsElapsed]
  )

  useEffect(fetchResults)

  const onSubmit = () => {
    setLoading(true)
    postHighscore(username.join(''), secondsElapsed)
      .then(() => {
        gameManager.restartGame()
      })
      .catch(() => {
        setLoading(false)
        setError('Could not submit your highscore!')
      })
  }

  const render = () => {
    if (!loading && error) {
      return (
        <>
          <div>{error}</div>
          <GameButton disabled={loading} onClick={fetchResults}>
            Retry
          </GameButton>
        </>
      )
    } else if (loading) {
      return <div>Loading...</div>
    } else if (!loading && !error) {
      return (
        <>
          <LeaderboardsTable userRank={rank} leaderboards={leaderboards} />
          <LeaderboardsScore>{timeElapsed}</LeaderboardsScore>
          <LeaderboardsUsernameInput />
          <GameButton disabled={loading} onClick={onSubmit}>
            Submit
          </GameButton>
        </>
      )
    }

    return null
  }

  return <LeaderboardsUIInner>{render()}</LeaderboardsUIInner>
}

export default observer(LeaderboardsUI)
