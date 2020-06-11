import { LooseMock } from '../mocks/looseMock'
import { StrictMock } from '../mocks/strictMock'
import { Control } from './common'
import { smartEq } from './toEqual'

export function toBeExhausted(control: Control<StrictMock<any, any>>) {
  return control.assert({
    success: control.actual.isExhausted(),
    reason: 'Mock not exhausted!',
    negatedReason: 'Mock exhausted!',
  })
}

export function toHaveBeenCalledWith<ARGS extends any[]>(control: Control<LooseMock<ARGS, any>>, expectedArgs: ARGS) {
  for (const call of control.actual.calls) {
    if (smartEq(call, expectedArgs)) {
      return control.assert({
        success: true,
        reason: '-',
        negatedReason: `Mock was called with ${JSON.stringify(expectedArgs)} but wasn't expected to`,
      })
    }
  }

  return control.assert({
    success: false,
    reason: `Mock was not called with ${JSON.stringify(expectedArgs)} but was expected to`,
    negatedReason: '-',
  })
}
