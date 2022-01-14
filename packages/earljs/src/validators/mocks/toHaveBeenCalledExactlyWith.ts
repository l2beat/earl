import { Control } from '../../Control'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { Mock } from '../../mocks'

function getCallsArgs<Args extends any[]>(mock: Mock<Args, any>): Args[] {
  return mock.calls.map((c) => c.args)
}

export function toHaveBeenCalledExactlyWith<Args extends any[]>(
  control: Control<Mock<Args, any>>,
  expectedArgs: Args[],
) {
  const callsArgs = getCallsArgs(control.actual)
  const formatted = formatCompact(expectedArgs)
  return control.assert({
    success: isEqual(callsArgs, expectedArgs),
    reason: `Mock was not called exactly with ${formatted} but was expected to`,
    negatedReason: `Mock was called exactly with ${formatted} but wasn't expected to`,
    actual: format(callsArgs, null),
    expected: format(expectedArgs, callsArgs),
  })
}
