import { Control } from '../../Control'
import { Mock } from '../../mocks'
import { formatValue, replaceMatchersWithMatchedValues } from '../common'
import { smartEq } from '../smartEq'

function getCallsArgs<Args extends any[]>(mock: Mock<Args, any>): Args[] {
  return mock.calls.map((c) => c.args)
}

export function toHaveBeenCalledExactlyWith<Args extends any[]>(
  control: Control<Mock<Args, any>>,
  expectedArgs: Args[],
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
