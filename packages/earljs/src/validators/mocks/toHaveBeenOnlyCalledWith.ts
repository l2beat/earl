import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { Mock, MockArgs } from '../../mocks'
import { assertIsMock, compareArgs, formatCalledTimes } from './utils'

declare module '../../expect' {
  interface Validators<T, R> {
    toHaveBeenOnlyCalledWith(
      this: Validators<Mock<any[], any>, R>,
      ...args: MockArgs<T>
    ): R
  }
}

registerValidator('toHaveBeenOnlyCalledWith', toHaveBeenOnlyCalledWith)

export function toHaveBeenOnlyCalledWith(
  control: Control,
  ...expected: unknown[]
) {
  assertIsMock(control)

  const onlyCall = control.actual.calls[0]
  if (control.actual.calls.length !== 1 || onlyCall === undefined) {
    const calledTimes = formatCalledTimes(control.actual)
    return control.assert({
      success: false,
      reason: `The mock function was ${calledTimes}, but it was expected to have been called exactly once.`,
      negatedReason: '',
    })
  }

  compareArgs(control, onlyCall.args, expected)
}
