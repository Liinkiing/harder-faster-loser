import React, {FunctionComponent} from 'react'
import styled from 'styled-components'

interface Props {
  color?: string,
  size?: "small" | "medium" | "large"
}

const Div = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  left: 6px;
  border-style: solid;
  border-width: 20px 0 20px 30px;
  transform: ${(props: Props) => {
    switch (props.size) {
      case "small":
        return 'scale(0.6)'
      case "medium":
        return 'scale(0.7)'
      case "large":
        return 'scale(0.8)'
    }
    return 'scale(1)'
  }
  };
  border-color: transparent transparent transparent ${props => props.color};
`

const PlayIcon: FunctionComponent<Props> = (props) => {
  const { color } = props

  return (
    <Div {...props} className="play-icon" style={{ color }}/>
  )
}

PlayIcon.defaultProps = {
  color: 'white',
  size: "large"
}

export default PlayIcon
