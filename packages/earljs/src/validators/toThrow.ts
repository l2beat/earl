import { assert } from 'ts-essentials'

import { Control } from '../Control'
import { isEqual } from '../isEqual'
import { replaceMatchersWithMatchedValues } from './common'

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

  const reason = `Expected to throw "${expected}" but threw "${actualThrownValue}"`
  const negatedReason = `Expected not to throw "${expected}" but threw "${actualThrownValue}"`

  if (!isEqual(actualThrownValue, expected)) {
    control.assert({
      success: false,
      reason,
      negatedReason,
      actual: actualThrownValue,
      expected: replaceMatchersWithMatchedValues(actualThrownValue, expected),
    })
  } else {
    control.assert({
      success: true,
      reason,
      negatedReason,
    })
  }
}
