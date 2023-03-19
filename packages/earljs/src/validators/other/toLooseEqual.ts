import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { LOOSE_FORMAT_OPTIONS } from '../../format/FormatOptions'
import { isEqual, LOOSE_EQUALITY_OPTIONS } from '../../isEqual'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toLooseEqual(expected: unknown): R
  }
}

registerValidator('toLooseEqual', toLooseEqual)

export function toLooseEqual(control: Control<unknown>, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected, LOOSE_EQUALITY_OPTIONS),
    reason: `The value ${actualInline} is not loosely equal to ${expectedInline}, but it was expected to be loosely equal.`,
    negatedReason: `The value ${actualInline} is loosely equal to ${expectedInline}, but it was expected not to be loosely equal.`,
    actual: format(control.actual, null, LOOSE_FORMAT_OPTIONS),
    expected: format(expected, control.actual, LOOSE_FORMAT_OPTIONS),
  })
}
