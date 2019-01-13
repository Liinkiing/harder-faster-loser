import { keyframes } from 'styled-components'

export const guidelineContainerAppear = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

export const guidelineContainerLeaving = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

export const guidelineAppear = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const guidelineLeaving = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
`
