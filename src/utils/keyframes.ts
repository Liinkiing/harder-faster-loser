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
    transform: translateX(-100%);
  }
`

export const guidelineAppear = keyframes`
  from {
    transform: translateX(calc(100% * 4));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const guidelineLeaving = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(calc(100% * 4));
    opacity: 0;
  }
`
