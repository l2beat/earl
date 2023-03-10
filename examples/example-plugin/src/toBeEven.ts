import { Expectation, getControl } from 'earljs/internals'

export function toBeEven(this: Expectation<number>): void {
  const ctrl = getControl(this)

  ctrl.assert({
    success: ctrl.actual % 2 === 0,
    reason: `Number ${ctrl.actual} is not even!`,
    negatedReason: `Number ${ctrl.actual} is even!`,
  })
}
