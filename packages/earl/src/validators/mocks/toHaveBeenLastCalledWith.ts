import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { MockFunction, MockParameters } from '../../mocks/index.js'
import { assertIsMock, compareArgs } from './utils.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that when the mock function was called the last time it was
     * called with the given arguments. If the function was never called this
     * will fail.
     *
     * The arguments are checked for deep equality and can also be matchers.
     *
     * If you would like to assert that the function was only called once use
     * `expect(fn).toHaveBeenOnlyCalledWith(...)` instead.
     *
     * @param args - The arguments the mock function was expected to be called
     *   with. They can also be matchers.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earl'
     *
     * const fn = mockFn((a: string, b: string) => a + ' ' + b)
     * fn('i like', 'pancakes')
     * fn('you like', 'waffles')
     *
     * expect(fn).toHaveBeenLastCalledWith('you like', expect.a(String))
     * expect(fn).not.toHaveBeenLastCalledWith('i like', 'pancakes')
     * ```
     */
    toHaveBeenLastCalledWith(
      this: Validators<MockFunction<any[], any>>,
      ...args: MockParameters<T>
    ): void
  }
}

registerValidator('toHaveBeenLastCalledWith', toHaveBeenLastCalledWith)

export function toHaveBeenLastCalledWith(
  control: Control,
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
