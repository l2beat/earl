import { assert } from 'ts-essentials'

import { Control } from './common'
import { smartEq } from './toEqual'

export function toThrow(control: Control<() => any>, expected?: any) {
  assert(control.actual instanceof Function, 'Actual has to be a function to check if threw')

  let actualThrowValue: any | undefined
  let threwAnything = false
  try {
    control.actual()
  } catch (e) {
    threwAnything = true
    actualThrowValue = e
  }

  // we need special handling for this case otherwise we end up with really dummy error message
  if (!threwAnything) {
    return control.assert({
      success: false,
      reason: `Expected to throw but didn't`,
      negatedReason: '-',
    })
  }

  const reason = `Expected to throw "${expected}" but threw "${actualThrowValue}"`
  const negatedReason = `Expected not to throw "${expected}" but threw "${actualThrowValue}"`

  if (!smartEq(actualThrowValue, expected)) {
    if (arguments.length === 1 && !control.isNegated) {
      control.autofix('toThrow', control.actual)
      control.assert({
        success: true,
        reason,
        negatedReason,
      })
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
