import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { Mock, MockArgs } from '../../mocks'
import {
  assertIsMock,
  compareArgs,
  formatCalledTimes,
  formatTimes,
} from './utils'

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
  ...expected: unknown[]
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
    const calledTimes = formatCalledTimes(control.actual)
    return control.assert({
      success: false,
      reason: `The mock function was ${calledTimes}, but it was expected to have been called at least ${times}.`,
      negatedReason: '',
    })
  }

  compareArgs(control, nthCall.args, expected)
}
