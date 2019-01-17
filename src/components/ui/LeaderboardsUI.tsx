import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import { black, green } from '../../utils/colors'
import LeaderboardsTable from './leaderboards/LeaderboardsTable'
import { observer } from 'mobx-react-lite'
import leaderboardsStore from '../../store/LeaderboardsStore'
import LeaderboardsUsernameInput from './leaderboards/LeaderboardsUsernameInput'
import gameStore from '../../store/GameStore'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'

const LeaderboardsUIInner = styled.div`
  background: ${green};
  color: ${black};
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
  font-size: 30px;
`

const SocialNetworksIcons = styled.div`
  display: flex;
  margin-top: 30px;
  width: 200px;
  justify-content: space-evenly;
  pointer-events: all;
  & img {
    width: 50px;
    height: 50px;
  }
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
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchResults = useCallback(() => {
    setLoading(true)
    setHasSubmittedScore(false)
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
  }, [])

  useEffect(fetchResults)

  const handleHomeButtonClick = () => {
    gameManager.restartGame()
  }

  const onSubmit = () => {
    setLoading(true)
    postHighscore(username.join(''), secondsElapsed)
      .then(() => {
        setHasSubmittedScore(true)
        setLoading(false)
      })
      .catch(() => {
        setHasSubmittedScore(false)
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
          <GameButton onClick={handleHomeButtonClick}>Home</GameButton>
        </>
      )
    } else if (loading) {
      return <div>Loading...</div>
    } else if (!error) {
      return (
        <>
          <LeaderboardsTable userRank={rank} leaderboards={leaderboards} />
          {!hasSubmittedScore && (
            <LeaderboardsScore>{timeElapsed}</LeaderboardsScore>
          )}
          {!hasSubmittedScore && <LeaderboardsUsernameInput />}
          {!hasSubmittedScore && (
            <GameButton disabled={loading} onClick={onSubmit}>
              Submit
            </GameButton>
          )}
          {hasSubmittedScore && (
            <>
              <GameButton disabled={loading} onClick={handleHomeButtonClick}>
                Home
              </GameButton>
              <SocialNetworksIcons>
                <a target="_blank" href={leaderboardsStore.facebookUrl}>
                  <img
                    alt="Facebook"
                    src={require('../../assets/images/icons/btn_facebook.png')}
                  />
                </a>
                <a target="_blank" href={leaderboardsStore.tweetUrl}>
                  <img
                    alt="Twitter"
                    src={require('../../assets/images/icons/btn_twitter.png')}
                  />
                </a>
              </SocialNetworksIcons>
            </>
          )}
        </>
      )
    }

    return null
  }

  return <LeaderboardsUIInner>{render()}</LeaderboardsUIInner>
}

export default observer(LeaderboardsUI)
