import { Control } from './common'
import { smartEq } from './toEqual'

export async function toBeRejected(control: Control<Promise<any>>, expected?: any): Promise<void> {
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

  const shouldAutofix = arguments.length === 1 && !control.isNegated

  if (!smartEq(actualRejectedValue, expected)) {
    if (shouldAutofix) {
      control.autofix('toBeRejected', actualRejectedValue)
    } else {
      control.assert({
        success: false,
        reason,
        negatedReason,
      })
    }
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
    })
  }
}
