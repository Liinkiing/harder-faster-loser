export const yellow = '#fcdb73'
export const blue = '#1334ff'
export const pink = '#f99bf3'
export const green = '#6adeb8'

export const orange = '#ff6b35'
export const lightRed = '#ff5a5a'
export const red = '#dc103c'

export const white = '#ffffff'
export const lightGray = '#cecdd0'
export const mediumGray = '#948d9b'
export const darkGray = '#4d4851'
export const black = '#28252a'

export const hexToRgba = (hex: string, alpha: number): string => {
  const test = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (m, r, g, b) => '#' + r + r + g + g + b + b
  )
  if (test && test.substring(1).match(/.{2}/g)) {
    return `rgba(${test
      .substring(1)
      .match(/.{2}/g)!
      .map(x => parseInt(x, 16))
      .join(', ')}, ${alpha})`
  }
  throw new Error('Could not convert color')
}

export default [
  yellow,
  blue,
  pink,
  green,
  orange,
  lightRed,
  red,
  white,
  lightGray,
  mediumGray,
  darkGray,
  black,
]
