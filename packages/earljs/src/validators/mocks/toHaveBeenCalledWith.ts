import { Mock } from '../../mocks'
import { Control, formatValue, replaceMatchersWithMatchedValues } from '../common'
import { smartEq } from '../smartEq'

export function toHaveBeenCalledWith<ARGS extends any[]>(control: Control<Mock<ARGS, any>>, expectedArgs: ARGS) {
  for (const call of control.actual.calls) {
    if (smartEq(call.args, expectedArgs).result === 'success') {
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
