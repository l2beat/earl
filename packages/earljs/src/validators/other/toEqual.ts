import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'

declare module '../../expect' {
  interface Validators<T> {
    toEqual(expected: T): void
  }
}

registerValidator('toEqual', toEqual)

export function toEqual(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected),
    reason: `The value ${actualInline} is not equal to ${expectedInline}, but it was expected to be equal.`,
    negatedReason: `The value ${actualInline} is equal to ${expectedInline}, but it was expected not to be equal.`,
    actual: format(control.actual, null),
    expected: format(expected, control.actual),
  })
}
