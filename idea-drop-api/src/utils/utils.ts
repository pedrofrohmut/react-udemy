// TypeNarrowing instead of just boolean makes typescript work
export const isNumber = (x: any): x is number => !isNaN(Number(x))

// TypeNarrowing: 'err is Error' instead of just 'boolean' because typescript is dumb
export const isError = (err: unknown): err is Error => err instanceof Error
