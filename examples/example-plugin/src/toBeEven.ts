import { registerValidator, Control, formatCompact } from 'earljs'

declare module 'earljs' {
  interface Validators<T> {
    toBeEven(this: Validators<number>): void
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
