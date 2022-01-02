import { Control } from '../../Control'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { Mock } from '../../mocks'

export function toHaveBeenCalledWith<Args extends any[]>(control: Control<Mock<Args, any>>, expectedArgs: Args) {
  for (const call of control.actual.calls) {
    if (isEqual(call.args, expectedArgs)) {
      return control.assert({
        success: true,
        reason: '-',
        negatedReason: `Mock was called with ${formatCompact(expectedArgs)} but wasn't expected to`,
        actual: format(call.args, null),
        expected: format(expectedArgs, call.args),
      })
    }
  }

  // @todo this should find smallest diff between expected calls and actual calls

  return control.assert({
    success: false,
    reason: `Mock was not called with ${formatCompact(expectedArgs)} but was expected to`,
    negatedReason: '-',
    actual: format(control.actual.calls[0], null),
    expected: format(expectedArgs, control.actual.calls[0]),
  })
}
