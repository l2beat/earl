import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { truthy } from '../../matchers/basic/truthy.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is truthy, as defined by:
     * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
     *
     * You can also use its sister validator, `toBeFalsy`, to match the
     * opposite.
     *
     * If you want to match a nested value, use the matcher `expect.truthy()`
     * instead.
     *
     * @example
     * ```ts
     * expect(1).toBeTruthy()
     * expect('foo').toBeTruthy()
     * expect(true).toBeTruthy()
     * expect({ x: 1, y: 2 }).toBeTruthy()
     *
     * expect(0).not.toBeTruthy()
     * expect('').not.toBeTruthy()
     * expect(false).not.toBeTruthy()
     * expect(null).not.toBeTruthy()
     * ```
     */
    toBeTruthy(): void
  }
}

registerValidator('toBeTruthy', toBeTruthy)

export function toBeTruthy(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: truthy()(control.actual),
    reason: `The value ${actualInline} is not truthy, but it was expected to be truthy.`,
    negatedReason: `The value ${actualInline} is truthy, but it was expected not to be truthy.`,
  })
}
