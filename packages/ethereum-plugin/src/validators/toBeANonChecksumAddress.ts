import { Control, Expectation, getControl } from 'earljs/internals'

import { isNonChecksumAdress } from '../utils'

export function toBeANonChecksumAddress(this: Expectation<any>): void {
  const ctrl = getControl(this) as Control<string>

  ctrl.assert({
    success: isNonChecksumAdress(ctrl.actual),
    reason: `String "${ctrl.actual}" is not a non-checksummed ethereum address!`,
    negatedReason: `String "${ctrl.actual}" is a non-checksummed ethereum address!`,
  })
}
