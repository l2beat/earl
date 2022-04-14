import { Control, Expectation, getControl } from 'earljs/internals'

import { isPrivateKey } from '../utils'

export function toBeAPrivateKey(this: Expectation<any>): void {
  const ctrl = getControl(this) as Control<string>

  ctrl.assert({
    success: isPrivateKey(ctrl.actual),
    reason: `String "${ctrl.actual}" is not a private key!`,
    negatedReason: `String "${ctrl.actual}" is a private key!`,
  })
}
