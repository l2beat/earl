import type { Control } from '../../Control.js'
import { formatCompact } from '../../format/index.js'
import { isEqual } from '../../isEqual/index.js'
import { type MockFunction, isMockFn } from '../../mocks/index.js'

export function assertIsMock(
  control: Control,
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
): asserts control is Control & { actual: MockFunction<any[], any> } {
  if (!isMockFn(control.actual)) {
    const actualInline = formatCompact(control.actual)
    return control.fail({
      reason: `The value ${actualInline} is not a mock function, but it was expected to be a mock function.`,
    })
  }
}

export function formatTimes(times: number) {
  return times === 1 ? 'once' : times === 2 ? 'twice' : `${times} times`
}

// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function formatCalledTimes(mock: MockFunction<any[], any>) {
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
    actual,
    expected,
  })
}
