import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { MockFunction } from '../../mocks/index.js'
import { assertIsMock, formatCalledTimes } from './utils.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that the mock function has been called at least once.
     *
     * @example
     * ```ts
     * import { expect, mockFn } from 'earl'
     *
     * const fn1 = mockFn().returns(42)
     * fn1()
     * expect(fn1).toHaveBeenCalled()
     *
     * const fn2 = mockFn().returns(42)
     * expect(fn2).not.toHaveBeenCalled()
     * ```
     */
    toHaveBeenCalled(this: Validators<MockFunction<any[], any>>): void
  }
}

registerValidator('toHaveBeenCalled', toHaveBeenCalled)

export function toHaveBeenCalled(control: Control) {
  assertIsMock(control)

  const calledTimes = formatCalledTimes(control.actual)
  return control.assert({
    success: control.actual.calls.length > 0,
    reason: `The mock function was ${calledTimes}, but it was expected to have been called at least once.`,
    negatedReason: `The mock function was ${calledTimes}, but it was expected to never have been called.`,
  })
}
