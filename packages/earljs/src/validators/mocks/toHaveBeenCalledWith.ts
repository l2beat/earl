import { Control } from '../../Control'
import { isEqual } from '../../isEqual'
import { Mock } from '../../mocks'
import { formatValue, replaceMatchersWithMatchedValues } from '../common'

export function toHaveBeenCalledWith<Args extends any[]>(control: Control<Mock<Args, any>>, expectedArgs: Args) {
  for (const call of control.actual.calls) {
    if (isEqual(call.args, expectedArgs)) {
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
