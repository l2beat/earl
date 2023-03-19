import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { Mock } from '../../mocks'
import { assertIsMock, formatCalledTimes, formatTimes } from './utils'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toHaveBeenCalledTimes(
      this: Validators<Mock<any[], any>, R>,
      times: number,
    ): R
  }
}

registerValidator('toHaveBeenCalledTimes', toHaveBeenCalledTimes)

export function toHaveBeenCalledTimes(control: Control, times: number) {
  assertIsMock(control)

  if (!Number.isInteger(times) || times < 0) {
    const timeInline = formatCompact(times)
    throw new TypeError(
      `toHaveBeenCalledTimes expects the first argument to be a non-negative integer, but received ${timeInline}.`,
    )
  }

  const expectedTimes = formatTimes(times)
  const calledTimes = formatCalledTimes(control.actual)
  return control.assert({
    success: control.actual.calls.length === times,
    reason: `The mock function was ${calledTimes}, but it was expected to have been called ${expectedTimes}.`,
    negatedReason: `The mock function was ${calledTimes}, but it was expected not to have been called ${expectedTimes}.`,
  })
}
