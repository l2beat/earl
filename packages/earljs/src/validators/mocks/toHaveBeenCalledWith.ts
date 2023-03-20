import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { isEqual } from '../../isEqual'
import { Mock, MockArgs } from '../../mocks'
import { assertIsMock } from './utils'

declare module '../../expect' {
  interface Validators<T, R> {
    toHaveBeenCalledWith(
      this: Validators<Mock<any[], any>, R>,
      ...args: MockArgs<T>
    ): R
  }
}

registerValidator('toHaveBeenCalledWith', toHaveBeenCalledWith)

export function toHaveBeenCalledWith(control: Control, ...expected: unknown[]) {
  assertIsMock(control)

  if (control.actual.calls.length === 0) {
    return control.assert({
      success: false,
      reason: `The mock function was never called, but it was expected to have been called at least once.`,
      negatedReason: '',
    })
  }

  const matchingArgs = control.actual.calls.find((call) =>
    isEqual(call.args, expected),
  )

  const matchingInline = formatCompact(matchingArgs?.args)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: matchingArgs !== undefined,
    reason: `The mock function was never called with ${expectedInline}, but was expected to have been.`,
    negatedReason: `The passed arguments ${matchingInline} are equal to ${expectedInline}, but were expected not to be equal.`,
  })
}
