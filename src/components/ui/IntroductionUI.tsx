import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import AutoScroll from './AutoScroll'
import Spacer from './Spacer'
import GameButton from './GameButton'
import gameManager from '../../game/manager/GameManager'

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

  div {
    max-width: 1280px;
    padding: 15px;
  }
`

const IntroductionUI: FunctionComponent = () => {
  const { loadHomescreen } = gameManager
  return (
    <IntroductionUIInner>
      <AutoScroll duration={3000}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          accusantium aliquid amet commodi, cupiditate earum eum ipsum
          laudantium, nisi non omnis perferendis quae quas quasi quos recusandae
          tenetur ut voluptatum?
        </div>
        <Spacer size="large" />
        <div>
          Accusamus aspernatur autem corporis, delectus ducimus ea eaque eius
          esse et expedita in itaque nisi, obcaecati officia possimus quas
          reprehenderit veniam, voluptate? Adipisci, fuga nihil? Laborum
          molestias quis vitae voluptatum.
        </div>
        <Spacer size="large" />
        <div>
          Culpa doloremque dolorum et mollitia repellat! Dignissimos ducimus
          harum illum ipsum molestias natus, nulla quam rem saepe sequi. Aliquam
          ducimus ea obcaecati omnis pariatur quibusdam reiciendis! Cum officia
          reiciendis sit.
        </div>
        <Spacer size="large" />
        <div>
          Accusamus accusantium ad amet aperiam aspernatur atque aut debitis
          dolore ex explicabo illo illum inventore maxime natus porro
          praesentium quibusdam quis recusandae rem totam unde vel voluptate
          voluptatem voluptates, voluptatibus?
        </div>
        <Spacer size="large" />
        <div>
          Consequatur ea, vel. A ab architecto dolorem doloremque ea esse
          eveniet explicabo inventore iste magni minima nesciunt, nihil nostrum
          officiis pariatur perspiciatis quasi qui quibusdam quidem, quo sunt
          tempora voluptatibus.
        </div>
        <Spacer size="large" />
        <GameButton size="small" onClick={loadHomescreen}>
          Wake toki
        </GameButton>
        <Spacer size="large" />
      </AutoScroll>
    </IntroductionUIInner>
  )
}

export default IntroductionUI
