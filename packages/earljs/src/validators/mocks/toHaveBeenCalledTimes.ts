import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { MockFunction } from '../../mocks'
import { assertIsMock, formatCalledTimes, formatTimes } from './utils'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that the mock function was called the given number of times.
     *
     * @param times - The number of times the mock function was expected to be called.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earljs'
     *
     * const fn = mockFn().returns(42)
     * fn()
     * expect(fn).toHaveBeenCalledTimes(1)
     * expect(fn).not.toHaveBeenCalledTimes(2)
     * ```
     */
    toHaveBeenCalledTimes(
      this: Validators<MockFunction<any[], any>>,
      times: number,
    ): void
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
