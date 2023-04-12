import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { MockFunction, MockParameters } from '../../mocks/index.js'
import {
  assertIsMock,
  compareArgs,
  formatCalledTimes,
  formatTimes,
} from './utils.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that when the mock function was called the nth time it was called
     * with the given arguments. If the function was called less than n times
     * this will fail.
     *
     * The arguments are checked for deep equality and can also be matchers.
     *
     * If you would like to always check the last call use
     * `expect(fn).toHaveBeenLastCalledWith(...)` instead.
     *
     * @param n - The call number to check the arguments of. Index starts at 1.
     * @param args - The arguments the mock function was expected to be called
     *   with the nth time. They can also be matchers.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earl'
     *
     * const fn = mockFn((a: string, b: string) => a + ' ' + b)
     * fn('i like', 'pancakes')
     * fn('you like', 'waffles')
     *
     * expect(fn).toHaveBeenNthCalledWith(1, 'i like', expect.a(String))
     * expect(fn).toHaveBeenNthCalledWith(2, 'you like', 'waffles')
     * expect(fn).not.toHaveBeenNthCalledWith(2, 'you like', 'pancakes')
     * ```
     */
    toHaveBeenNthCalledWith(
      this: Validators<MockFunction<any[], any>>,
      n: number,
      ...args: MockParameters<T>
    ): void
  }
}

registerValidator('toHaveBeenNthCalledWith', toHaveBeenNthCalledWith)

export function toHaveBeenNthCalledWith(
  control: Control,
  n: number,
  ...expected: unknown[]
) {
  assertIsMock(control)

  if (!Number.isInteger(n) || n < 1) {
    const timeInline = formatCompact(n)
    throw new TypeError(
      `toHaveBeenNthCalledWith expects the first argument to be a positive integer, but received ${timeInline}.`,
    )
  }

  const nthCall = control.actual.calls[n - 1]
  if (nthCall === undefined) {
    const times = formatTimes(n)
    const calledTimes = formatCalledTimes(control.actual)
    return control.assert({
      success: false,
      reason: `The mock function was ${calledTimes}, but it was expected to have been called at least ${times}.`,
      negatedReason: '',
      actual: control.actual.calls.length,
      expected: n,
    })
  }

  compareArgs(control, nthCall.args, expected)
}
