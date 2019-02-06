import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'

const IntroductionUIInner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: ${black};
`

const IntroductionUI: FunctionComponent = () => {
  return (
    <IntroductionUIInner>
      <h1>Je suis l'ui de l'intro</h1>
    </IntroductionUIInner>
  )
}

export default IntroductionUI
