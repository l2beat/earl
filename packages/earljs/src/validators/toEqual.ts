import { Control } from '../Control'
import { registerValidator } from '../expect'
import { format, formatCompact } from '../format'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Validators<T> {
    toEqual(expected: T): void
  }
}

registerValidator('toEqual', toEqual)

export function toEqual<T>(control: Control<T>, expected: T) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected),
    reason: `${actualInline} isn't equal to ${expectedInline}`,
    negatedReason: `${actualInline} is equal to ${expectedInline}`,
    actual: format(control.actual, null),
    expected: format(expected, control.actual),
  })
}
