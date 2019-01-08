export type GameBackgroundColor = string | number | InputColorObject

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
