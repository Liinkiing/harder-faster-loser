import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const Div = styled.div`
  ${(props: Props) => {
    switch (props.size!) {
      case 'small':
        return 'margin: 1rem 0'
      case 'medium':
        return 'margin: 2rem 0'
      case 'large':
        return 'margin: 4rem 0'
    }
  }}
`

const Spacer: FunctionComponent<Props> = props => {
  return <Div {...props} />
}

Spacer.defaultProps = {
  size: 'small',
}

export default Spacer
