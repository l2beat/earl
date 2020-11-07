import { Control, replaceMatchersWithMatchedValues } from './common'
import { smartEq } from './smartEq'

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

  const comparisonResult = smartEq(actualRejectedValue, expected)

  if (comparisonResult.result === 'error') {
    control.assert({
      success: false,
      hint: comparisonResult.result,
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
