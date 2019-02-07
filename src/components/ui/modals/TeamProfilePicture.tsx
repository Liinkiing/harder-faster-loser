import * as React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { white } from '../../../utils/colors'

const TeamProfilePictureInner = styled.div`
  margin: 30px 0;
  text-align: center;
  & img {
    width: 64px;
    image-rendering: pixelated;
  }
  & h4 {
    color: ${white};
    margin-top: 8px;
  }
`

interface Props {
  name: string
  alt?: string
  picture: string
}

const TeamProfilePicture: FunctionComponent<Props> = props => {
  const { name, picture, alt } = props

  return (
    <TeamProfilePictureInner>
      <img src={picture} alt={alt} />
      <h4>{name}</h4>
    </TeamProfilePictureInner>
  )
}

export default TeamProfilePicture
