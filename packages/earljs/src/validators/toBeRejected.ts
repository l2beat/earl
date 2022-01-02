import { Control } from '../Control'
import { isEqual } from '../isEqual'
import { replaceMatchersWithMatchedValues } from './common'

export async function toBeRejected(control: Control<Promise<any>>, expected: any): Promise<void> {
  let actualRejectedValue: any | undefined
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

  const reason = `Expected to be rejected with "${expected}" but got "${actualRejectedValue}"`
  const negatedReason = `Expected not to be rejected with "${expected}" but was rejected with ${actualRejectedValue}`

  if (!isEqual(actualRejectedValue, expected)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: actualRejectedValue,
      expected: replaceMatchersWithMatchedValues(actualRejectedValue, expected),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
      actual: actualRejectedValue,
      expected: replaceMatchersWithMatchedValues(actualRejectedValue, expected),
    })
  }
}
