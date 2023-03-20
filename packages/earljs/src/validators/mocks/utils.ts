import { Control } from '../../Control'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { isMock, Mock } from '../../mocks'

export function assertIsMock(
  control: Control,
): asserts control is Control & { actual: Mock<any[], any> } {
  if (!isMock(control.actual)) {
    const actualInline = formatCompact(control.actual)
    return control.fail({
      reason: `The value ${actualInline} is not a mock function, but it was expected to be a mock function.`,
    })
  }
}

export function formatTimes(times: number) {
  return times === 1 ? 'once' : times === 2 ? 'twice' : `${times} times`
}

export function formatCalledTimes(mock: Mock<any[], any>) {
  return mock.calls.length === 0
    ? 'never called'
    : `called ${formatTimes(mock.calls.length)}`
}

export function compareArgs(
  control: Control,
  actual: unknown[],
  expected: unknown[],
) {
  const actualInline = formatCompact(actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(actual, expected),
    reason: `The passed arguments ${actualInline} are not equal to ${expectedInline}, but were expected to be equal.`,
    negatedReason: `The passed arguments ${actualInline} are equal to ${expectedInline}, but were expected not to be equal.`,
    actual: format(actual, null),
    expected: format(expected, actual),
  })
}
