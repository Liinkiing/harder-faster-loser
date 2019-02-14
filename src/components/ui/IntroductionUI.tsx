import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import AutoScroll from './AutoScroll'
import Spacer from './Spacer'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'
import Spritesheet from './Spritesheet'
import TokiWheel from '../../assets/sprites/introduction/intro_toki_running.gif'

const IntroductionUIInner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: ${black};
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  line-height: 1.5em;

  div {
    max-width: 1280px;
    padding: 15px;
  }

  img {
    width: 55%;
  }
`

const IntroductionUI: FunctionComponent = () => {
  const { loadHomescreen } = gameManager
  return (
    <IntroductionUIInner>
      <AutoScroll duration={20000}>
        <div>Hey! 21st century isn’t a joke.</div>
        <Spacer size="large" />
        <div>
          If you want to survive, you don’t have a choice but to follow
          society’s rules. Phones, watches, alarms, schedules, queueings,
          messages, notifications…
        </div>
        <Spacer size="large" />
        <div>
          STOOOOOOOOOOOP, we’re drowning here. Is this real life? In this game
          it is.
        </div>
        <Spacer size="large" />
        <div>
          Help Toki survive on this battlefield. Obey the orders as fast as
          possible. Can you make it? Tic toc tic toc... loser!
        </div>
        <Spacer size="large" />
        <img src={TokiWheel} alt="Toki is running" />
        <Spacer size="large" />
        <GameButton size="small" onClick={loadHomescreen}>
          Wake toki
        </GameButton>
        <Spacer size="large" />
        <Spacer size="large" />
      </AutoScroll>
    </IntroductionUIInner>
  )
}

export default IntroductionUI
