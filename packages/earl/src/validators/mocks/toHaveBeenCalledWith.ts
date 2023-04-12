import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { isEqual } from '../../isEqual/index.js'
import { MockFunction, MockParameters } from '../../mocks/index.js'
import { assertIsMock } from './utils.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that the mock function was called at least once with the provided
     * arguments.
     *
     * The arguments are checked for deep equality and can also be matchers.
     *
     * Because this validator does not print the actual received arguments in
     * case of failure it is recommended to use one of the following matchers
     * instead:
     *
     * - `expect(fn).toHaveBeenOnlyCalledWith(...)`
     * - `expect(fn).toHaveBeenLastCalledWith(...)`
     * - `expect(fn).toHaveBeenNthCalledWith(time, ...)`
     *
     * @param args - The arguments the mock function was expected to be called
     *   with. They can also be matchers.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earl'
     *
     * const fn = mockFn((a: number, b: number) => a + b)
     * fn(1, 2)
     * fn(3, 4)
     * expect(fn).toHaveBeenCalledWith(3, expect.a(Number))
     * expect(fn).not.toHaveBeenCalledWith(5, 6)
     * ```
     */
    toHaveBeenCalledWith(
      this: Validators<MockFunction<any[], any>>,
      ...args: MockParameters<T>
    ): void
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
