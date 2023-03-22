import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'

declare module '../../expect' {
  interface Validators<T> {
    toEqualUnsorted(this: Validators<any[]>, expected: T): void
  }
}

registerValidator('toEqualUnsorted', toEqualUnsorted)

export function toEqualUnsorted(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  if (!Array.isArray(control.actual)) {
    return control.fail({
      reason: `The value ${actualInline} is not an array, but it was expected to be an array.`,
    })
  }

  if (!Array.isArray(expected)) {
    return control.fail({
      reason: `The argument ${expectedInline} is not an array, but it was expected to be an array.`,
    })
  }

  if (control.actual.length !== expected.length) {
    control.assert({
      success: false,
      reason: `The value ${actualInline} has a different length than ${expectedInline}, but is was expected to have the same length.`,
      negatedReason: '',
      actual: format(control.actual.length, null),
      expected: format(expected.length, control.actual.length),
    })
  }

  // TODO: this algorithm works really bad with matchers. Is there another way to do this?
  const cloned = [...expected]
  let reordered = []
  for (const item of control.actual) {
    const index = cloned.findIndex((c) => isEqual(item, c))
    if (index !== -1) {
      reordered.push(item)
      cloned.splice(index, 1)
    }
  }
  reordered = [...reordered, ...cloned]

  control.assert({
    success: isEqual(control.actual, reordered),
    reason: `The value ${actualInline} is not unsorted equal to ${expectedInline}, but it was expected to be unsorted equal.`,
    negatedReason: `The value ${actualInline} is unsorted equal to ${expectedInline}, but it was expected not to be unsorted equal.`,
    actual: format(control.actual, null),
    expected: format(reordered, control.actual),
  })
}
