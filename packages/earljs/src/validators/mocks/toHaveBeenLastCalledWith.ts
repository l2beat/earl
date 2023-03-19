import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { Mock, MockArgs } from '../../mocks'
import { assertIsMock, compareArgs } from './utils'

declare module '../../expect' {
  interface Validators<T, R> {
    toHaveBeenLastCalledWith(
      this: Validators<Mock<any[], any>, R>,
      ...args: MockArgs<T>
    ): R
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

  compareArgs(control, lastCall.args, expected)
}
