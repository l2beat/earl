import { Control } from '../Control'
import { format, formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { AnythingMatcher, ErrorMatcher } from '../matchers'

export async function toBeRejected(
  control: Control<Promise<unknown>>,
  expected: unknown,
): Promise<void> {
  let actualRejectedValue: unknown | undefined
  let rejectedAnything = false
  try {
    await control.actual
  } catch (e) {
    rejectedAnything = true
    actualRejectedValue = e
  }

  // we need special handling for this case otherwise we end up with really dummy error message
  if (!rejectedAnything) {
    return control.assert({
      success: false,
      reason: `Expected to be rejected but didn't`,
      negatedReason: '-',
    })
  }

  const actualFmt = formatCompact(actualRejectedValue)
  const expectedFmt =
    expected instanceof AnythingMatcher
      ? 'anything'
      : expected instanceof ErrorMatcher
      ? expected.format()
      : formatCompact(expected)

  const reason = `Expected to be rejected with ${expectedFmt} but got ${actualFmt}`
  const negatedReason = `Expected not to be rejected with ${expectedFmt} but was rejected with ${actualFmt}`

  if (!isEqual(actualRejectedValue, expected)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: format(actualRejectedValue, null),
      expected: format(expected, actualRejectedValue),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
      actual: format(actualRejectedValue, null),
      expected: format(expected, actualRejectedValue),
    })
  }
}
