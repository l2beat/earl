import { Mock } from '../../mocks'
import { Control, formatValue, replaceMatchersWithMatchedValues } from '../common'
import { smartEq } from '../smartEq'

function getCallsArgs<ARGS extends any[]>(mock: Mock<ARGS, any>): ARGS[] {
  return mock.calls.map((c) => c.args)
}

export function toHaveBeenCalledExactlyWith<ARGS extends any[]>(
  control: Control<Mock<ARGS, any>>,
  expectedArgs: ARGS[],
) {
  const callsArgs = getCallsArgs(control.actual)
  if (smartEq(callsArgs, expectedArgs).result === 'success') {
    return control.assert({
      success: true,
      reason: '-',
      negatedReason: `Mock was called exactly with ${formatValue(expectedArgs)} but wasn't expected to`,
      actual: callsArgs,
      expected: replaceMatchersWithMatchedValues(callsArgs, expectedArgs),
    })
  }

  return control.assert({
    success: false,
    reason: `Mock was not called exactly with ${formatValue(expectedArgs)} but was expected to`,
    negatedReason: '-',
    actual: callsArgs,
    expected: replaceMatchersWithMatchedValues(callsArgs, expectedArgs),
  })
}
