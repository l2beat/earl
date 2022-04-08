import { Control, Expectation, getControl } from 'earljs/internals'

import { isAddress } from '../utils'

export function toBeAnAddress(this: Expectation<any>): void {
  const ctrl = getControl(this) as Control<string>

  ctrl.assert({
    success: isAddress(ctrl.actual),
    reason: `String "${ctrl.actual}" is not an ethereum address!`,
    negatedReason: `String "${ctrl.actual}" is an ethereum address!`,
  })
}
