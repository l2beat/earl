import { type Control, formatCompact, registerValidator } from 'earl'

declare module 'earl' {
  interface Validators<T> {
    toBeEven(this: Validators<number>): void
  }
}

registerValidator('toBeEven', toBeEven)

export function toBeEven(control: Control) {
  const actualFmt = formatCompact(control.actual)
  control.assert({
    success: typeof control.actual === 'number' && control.actual % 2 === 0,
    reason: `${actualFmt} is not even!`,
    negatedReason: `${actualFmt} is even!`,
  })
}
