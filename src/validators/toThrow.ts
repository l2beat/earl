import { assert } from 'ts-essentials'

import { Control } from './common'

export function toThrow(control: Control<() => any>, expectedMsg?: string) {
  assert(control.actual instanceof Function, 'Actual has to be a function to check if threw')

  let error: any | undefined
  try {
    control.actual()
  } catch (e) {
    error = e
  }

  if (expectedMsg !== undefined) {
    control.assert({
      success: error?.message === expectedMsg,
      reason: `Expected to throw "${expectedMsg}" but threw "${error?.message}"`,
      negatedReason: `Expected not to throw "${expectedMsg}" but did`,
    })
  } else {
    control.assert({
      success: !!error,
      reason: `Expected to throw but didn't`,
      negatedReason: `Expected not to throw but threw ${error}`,
    })
  }
}
