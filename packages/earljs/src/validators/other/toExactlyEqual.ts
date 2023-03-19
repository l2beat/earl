import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toExactlyEqual(expected: unknown): R
  }
}

registerValidator('toExactlyEqual', toExactlyEqual)

export function toExactlyEqual(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: sameValueZero(control.actual, expected),
    reason: `The value ${actualInline} is not the exact same value as ${expectedInline}, but it was expected to be.`,
    negatedReason: `The value ${actualInline} is the exact same value as ${expectedInline}, but it was expected not to be.`,
    actual: format(control.actual, null),
    expected: format(expected, control.actual),
  })
}

function sameValueZero(x: unknown, y: unknown) {
  if (typeof x === 'number' && typeof y === 'number') {
    // x and y are equal (may be -0 and 0) or they are both NaN
    return x === y || (x !== x && y !== y)
  }
  return x === y
}
