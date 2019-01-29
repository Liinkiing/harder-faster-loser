import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { black } from '../../utils/colors'
import { observer } from 'mobx-react-lite'
import gameStore from '../../store/GameStore'

const TutorialScreenUIInner = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: ${black};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TutorialScreenUI: FunctionComponent = () => {
  const { tutorial } = gameStore
  return (
    <TutorialScreenUIInner>
      {tutorial ? (
        <>
          <h1>Day 1</h1>
          <p>A peaceful day for Toki</p>
        </>
      ) : (
        <>
          <h1>Day 2</h1>
          <p>A war day for Toki!</p>
        </>
      )}
    </TutorialScreenUIInner>
  )
}

export default observer(TutorialScreenUI)
