import * as React from 'react'
import { FunctionComponent, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  duration?: number
  onScrollEnd?: () => void
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | string
}

const AutoScrollInner = styled.div<Props>`
  position: absolute;
  top: 100%;
  ${({ duration, easing }: Props) =>
    css`
      transition: transform ${duration}ms ${easing};
    `}
`

const AutoScroll: FunctionComponent<Props> = props => {
  const { onScrollEnd, ...restProps } = props
  const content = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (content.current) {
      const { height } = content.current.getBoundingClientRect()
      content.current.style.transform = `translateY(calc(-${height}px))`
      if (onScrollEnd) {
        content.current.addEventListener('transitionend', onScrollEnd)
      }
    }

    return () => {
      if (content.current) {
        if (onScrollEnd) {
          content.current.removeEventListener('transitionend', onScrollEnd)
        }
      }
    }
  }, [])

  return (
    <AutoScrollInner {...restProps} ref={content}>
      {props.children}
    </AutoScrollInner>
  )
}

AutoScroll.defaultProps = {
  duration: 3000,
  easing: 'linear',
}

export default AutoScroll
