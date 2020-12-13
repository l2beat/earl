import { Control } from '../../Control'
import { Mock } from '../../mocks'
import { formatValue, replaceMatchersWithMatchedValues } from '../common'
import { smartEq } from '../smartEq'

function getCallsArgs<ARGS extends any[]>(mock: Mock<ARGS, any>): ARGS[] {
  return mock.calls.map((c) => c.args)
}

export function toHaveBeenCalledExactlyWith<ARGS extends any[]>(
  control: Control<Mock<ARGS, any>>,
  expectedArgs: ARGS[],
) {
  const callsArgs = getCallsArgs(control.actual)
  const formatted = formatValue(expectedArgs)
  return control.assert({
    success: smartEq(callsArgs, expectedArgs).result === 'success',
    reason: `Mock was not called exactly with ${formatted} but was expected to`,
    negatedReason: `Mock was called exactly with ${formatted} but wasn't expected to`,
    actual: callsArgs,
    expected: replaceMatchersWithMatchedValues(callsArgs, expectedArgs),
  })
}
