export const wait = (ms: number): Promise<TimerHandler> => new Promise(resolve => setTimeout(resolve, ms))
