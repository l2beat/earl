import { Control, formatCompact, registerValidator } from 'earljs'

declare module 'earljs' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toBeEven(this: Validators<number, R>): void
  }
}

registerValidator('toBeEven', toBeEven)

export function toBeEven(control: Control<number>) {
  const actualFmt = formatCompact(control.actual)
  control.assert({
    success: control.actual % 2 === 0,
    reason: `${actualFmt} is not even!`,
    negatedReason: `${actualFmt} is even!`,
  })
}
