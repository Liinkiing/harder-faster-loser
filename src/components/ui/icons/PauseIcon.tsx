import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

interface Props {
  color?: string,
  size?: "small" | "medium" | "large"
}

const Div = styled.div`
  display: flex;
  -webkit-font-smoothing: antialiased;
  justify-content: space-evenly;
  width: 40px;
  height: 40px;
  transform: ${props => {
    switch (props.size) {
      case "small":
        return 'scale(0.6)'
      case "medium":
        return 'scale(0.7)'
      case "large":
        return 'scale(0.8)'
    }
    return 'scale(0.8)'
    }
  };
  & .bar {
    position: relative;
    width: ${(props: Props) => {
      switch (props.size) {
        case "small":
          return '4px'
        case "medium":
          return '8px'
        case "large":
          return '12px'
      }
      
      return '8px'
}};
    height: 100%;
    background: ${props => props.color};
    &:first-of-type {
      margin-right: 0.6rem;
    }
  }
`

const PauseIcon: FunctionComponent<Props> = (props) => {
  const { color } = props

  return (
    <Div {...props} className="pause-icon" style={{ color }}>
      <div className="bar"/>
      <div className="bar"/>
    </Div>
  )
}

PauseIcon.defaultProps = {
  color: 'white',
  size: "large"
}

export default PauseIcon
