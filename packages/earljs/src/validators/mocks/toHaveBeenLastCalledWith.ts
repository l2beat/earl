import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { Mock, MockArgs } from '../../mocks'
import { assertIsMock } from './utils'

declare module '../../expect' {
  interface Validators<T> {
    toHaveBeenLastCalledWith(
      this: Validators<Mock<any[], any>>,
      ...args: MockArgs<T>
    ): void
  }
}

registerValidator('toHaveBeenLastCalledWith', toHaveBeenLastCalledWith)

export function toHaveBeenLastCalledWith(
  control: Control<unknown>,
  ...expected: unknown[]
) {
  assertIsMock(control)

  const lastCall = control.actual.calls.at(-1)
  if (lastCall === undefined) {
    return control.assert({
      success: false,
      reason: `The mock function was never called, but it was expected to have been called at least once.`,
      negatedReason: '',
    })
  }

  const argsInline = formatCompact(lastCall.args)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(lastCall.args, expected),
    reason: `The passed arguments ${argsInline} are not equal to ${expectedInline}, but were expected to be equal.`,
    negatedReason: `The passed arguments ${argsInline} are equal to ${expectedInline}, but were expected not to be equal.`,
    actual: format(lastCall.args, null),
    expected: format(expected, lastCall.args),
  })
}
