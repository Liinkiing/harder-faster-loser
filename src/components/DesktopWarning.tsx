import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Spritesheet from './ui/Spritesheet'
import animation from '../assets/sprites/hfl_desktop_anim_48x133.png'
import { green, red, white, yellow } from '../utils/colors'

const DesktopWarningInner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${green};
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  position: relative;
  text-align: center;
  top: -60px;
`

const Title = styled.h1`
  margin-top: 40px;
  font-size: 36px;
  color: ${yellow};
  text-transform: uppercase;
  text-shadow: -4px 4px 0 ${red};
`

const Subtitle = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  color: ${white};
`

const SpritesheetContainer = styled.div`
  width: 144px;
  height: 399px;
  margin: 0 auto;
`

const Message = styled.p`
  text-align: center;
  line-height: 27px;
  margin-top: 34px;
  font-size: 14px;
`

const Credits = styled.img`
  width: 120px;
  position: fixed;
  bottom: 50px;
  left: calc(50% - 60px);
`

const DesktopWarning: FunctionComponent = () => {
  return (
    <DesktopWarningInner>
      <Container>
        <SpritesheetContainer>
          <Spritesheet
            image={animation}
            widthFrame={48}
            heightFrame={133}
            steps={97}
            fps={18}
            loop={true}
          />
        </SpritesheetContainer>
        <Title>Harder,&thinsp;Faster,&thinsp;Loser</Title>
        <Subtitle>Toki's war day</Subtitle>
        <Message>
          Currently only mobile version <br />
          is available,&thinsp;loser.
        </Message>
        <Credits
          src="/static/assets/sprites/splashscreen/credits.png"
          alt="Credits"
        />
      </Container>
    </DesktopWarningInner>
  )
}

export default DesktopWarning
