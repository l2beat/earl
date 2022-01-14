import { assert } from 'ts-essentials'

import { Control } from '../Control'
import { format, formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { AnythingMatcher, ErrorMatcher } from '../matchers'

export function toThrow(control: Control<() => void>, expected: any) {
  assert(control.actual instanceof Function, 'Actual has to be a function to check if threw')

  let actualThrownValue: any | undefined
  let threwAnything = false
  try {
    control.actual()
  } catch (e) {
    threwAnything = true
    actualThrownValue = e
  }

  // we need special handling for this case otherwise we end up with really dummy error message
  if (!threwAnything) {
    return control.assert({
      success: false,
      reason: `Expected to throw but didn't`,
      negatedReason: '-',
    })
  }

  const actualFmt = formatCompact(actualThrownValue)
  const expectedFmt =
    expected instanceof AnythingMatcher
      ? 'anything'
      : expected instanceof ErrorMatcher
      ? expected.format()
      : formatCompact(expected)

  const reason = `Expected to throw ${expectedFmt} but threw ${actualFmt}`
  const negatedReason = `Expected not to throw ${expectedFmt} but threw ${actualFmt}`

  if (!isEqual(actualThrownValue, expected)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: format(actualThrownValue, null),
      expected: format(expected, actualThrownValue),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
    })
  }
}
