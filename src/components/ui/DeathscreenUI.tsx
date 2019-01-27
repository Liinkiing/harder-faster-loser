import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Div = styled.div`
  margin: 80px auto 0 auto;
  text-align: center;
  font-size: 30px;
`

const DeathscreenUI: FunctionComponent = () => {
  return (
    <Div className="deathscreen-ui">
      <p>
        Toki died
        <br />
        of a<br />
        burn out
      </p>
    </Div>
  )
}

export default DeathscreenUI
