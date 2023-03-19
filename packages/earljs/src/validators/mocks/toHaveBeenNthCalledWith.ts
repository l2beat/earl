import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { Mock, MockArgs } from '../../mocks'
import { assertIsMock } from './utils'

declare module '../../expect' {
  interface Validators<T> {
    toHaveBeenNthCalledWith(
      this: Validators<Mock<any[], any>>,
      time: number,
      ...args: MockArgs<T>
    ): void
  }
}

registerValidator('toHaveBeenNthCalledWith', toHaveBeenNthCalledWith)

export function toHaveBeenNthCalledWith(
  control: Control<unknown>,
  time: number,
  ...expected: any[]
) {
  assertIsMock(control)

  if (!Number.isInteger(time) || time < 1) {
    const timeInline = formatCompact(time)
    throw new TypeError(
      `toHaveBeenNthCalledWith expects the first argument to be a positive integer, but received ${timeInline}.`,
    )
  }

  const nthCall = control.actual.calls[time - 1]
  if (nthCall === undefined) {
    const times = formatTimes(time)
    const calledTimes =
      control.actual.calls.length === 0
        ? 'never called'
        : `called ${formatTimes(control.actual.calls.length)}`
    return control.assert({
      success: false,
      reason: `The mock function was ${calledTimes}, but it was expected to have been called at least ${times}.`,
      negatedReason: '',
    })
  }

  const argsInline = formatCompact(nthCall.args)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(nthCall.args, expected),
    reason: `The passed arguments ${argsInline} are not equal to ${expectedInline}, but were expected to be equal.`,
    negatedReason: `The passed arguments ${argsInline} are equal to ${expectedInline}, but were expected not to be equal.`,
    actual: format(nthCall.args, null),
    expected: format(expected, nthCall.args),
  })
}

function formatTimes(times: number) {
  return times === 1 ? 'once' : times === 2 ? 'twice' : `${times} times`
}
