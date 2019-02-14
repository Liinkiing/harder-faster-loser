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

const Title = styled.h1`
  color: ${yellow};
  text-shadow: -4px 4px 0 ${red};
`

const Subtitle = styled.h2`
  color: ${white};
`

const SpritesheetContainer = styled.div`
  width: 144px;
  height: 399px;
`

const Credits = styled.img`
  width: 120px;
`

const DesktopWarning: FunctionComponent = () => {
  return (
    <DesktopWarningInner>
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
      <Title>Harder, Faster, Looser</Title>
      <Subtitle>Toki's war day</Subtitle>
      <p>Currently only mobile version available</p>
      <Credits
        src="/static/assets/sprites/splashscreen/credits.png"
        alt="Credits"
      />
    </DesktopWarningInner>
  )
}

export default DesktopWarning
