import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { Mock } from '../../mocks'
import { assertIsMock, formatCalledTimes } from './utils'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toHaveBeenCalled(this: Validators<Mock<any[], any>>): void
  }
}

registerValidator('toHaveBeenCalled', toHaveBeenCalled)

export function toHaveBeenCalled(control: Control<unknown>) {
  assertIsMock(control)

  const calledTimes = formatCalledTimes(control.actual)
  return control.assert({
    success: control.actual.calls.length > 0,
    reason: `The mock function was ${calledTimes}, but it was expected to have been called at least once.`,
    negatedReason: `The mock function was ${calledTimes}, but it was expected to never have been called.`,
  })
}
