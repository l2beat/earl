import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { MockFunction, MockParameters } from '../../mocks/index.js'
import { assertIsMock, compareArgs, formatCalledTimes } from './utils.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that the mock function was called exactly once and with the
     * provided arguments.
     *
     * The arguments are checked for deep equality and can also be matchers.
     *
     * If you don't care that the function was only called once use
     * `expect(fn).toHaveBeenNthCalledWith(1, ...)` instead.
     *
     * @param args - The arguments the mock function was expected to be called
     *   with. They can also be matchers.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earl'
     *
     * const fn1 = mockFn((a: number, b: number) => a + b)
     * fn1(1, 2)
     * expect(fn1).toHaveBeenOnlyCalledWith(1, expect.a(Number))
     *
     * const fn2 = mockFn((a: number, b: number) => a + b)
     * fn2(1, 2)
     * fn2(3, 4)
     * expect(fn2).not.toHaveBeenOnlyCalledWith(1, 2)
     * ```
     */
    toHaveBeenOnlyCalledWith(
      this: Validators<MockFunction<any[], any>>,
      ...args: MockParameters<T>
    ): void
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
      actual: control.actual.calls.length,
      expected: 1,
    })
  }

  compareArgs(control, onlyCall.args, expected)
}
