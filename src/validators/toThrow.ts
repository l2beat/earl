import { assert } from 'ts-essentials'

import { Control } from './common'
import { smartEq } from './toEqual'

export function toThrow(control: Control<() => any>, expected?: any) {
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

  const reason = `Expected to throw "${expected}" but threw "${actualThrownValue}"`
  const negatedReason = `Expected not to throw "${expected}" but threw "${actualThrownValue}"`

  const shouldAutofix = arguments.length === 1 && !control.isNegated

  if (!smartEq(actualThrownValue, expected)) {
    if (shouldAutofix) {
      control.autofix('toThrow', actualThrownValue)
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
