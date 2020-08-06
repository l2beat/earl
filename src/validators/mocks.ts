import { LooseMock } from '../mocks/looseMock'
import { StrictMock } from '../mocks/strictMock'
import { Control, formatValue, replaceMatchersWithMatchedValues, smartEq } from './common'

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
        negatedReason: `Mock was called with ${formatValue(expectedArgs)} but wasn't expected to`,
        actual: call,
        expected: replaceMatchersWithMatchedValues(call, expectedArgs),
      })
    }
  }

  // @todo this should find smallest diff between expected calls and actual calls
  return control.assert({
    success: false,
    reason: `Mock was not called with ${formatValue(expectedArgs)} but was expected to`,
    negatedReason: '-',
    actual: control.actual.calls[0],
    expected: replaceMatchersWithMatchedValues(control.actual.calls[0], expectedArgs),
  })
}

export function toHaveBeenCalledExactlyWith<ARGS extends any[]>(
  control: Control<LooseMock<ARGS, any>>,
  expectedArgs: ARGS[],
) {
  if (smartEq(control.actual.calls, expectedArgs)) {
    return control.assert({
      success: true,
      reason: '-',
      negatedReason: `Mock was called with ${formatValue(expectedArgs)} but wasn't expected to`,
      actual: control.actual.calls,
      expected: replaceMatchersWithMatchedValues(control.actual.calls, expectedArgs),
    })
  }

  return control.assert({
    success: false,
    reason: `Mock was not called with ${formatValue(expectedArgs)} but was expected to`,
    negatedReason: '-',
    actual: control.actual.calls,
    expected: replaceMatchersWithMatchedValues(control.actual.calls, expectedArgs),
  })
}
