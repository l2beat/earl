import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { nullish } from '../../matchers/basic/nullish.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is nullish, meaning it is either `null` or
     * `undefined`.
     *
     * If you want to match a nested value, use the matcher `expect.nullish()`
     * or `expect.notNullish()` instead.
     *
     * @example
     * ```ts
     * expect(null).toBeNullish()
     * expect(undefined).toBeNullish()
     *
     * expect('foo').not.toBeNullish()
     * expect({ x: 1 }).not.toBeNullish()
     * ```
     */
    toBeNullish(): void
  }
}

registerValidator('toBeNullish', toBeNullish)

export function toBeNullish(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: nullish()(control.actual),
    reason: `The value ${actualInline} is not nullish, but it was expected to be nullish.`,
    negatedReason: `The value ${actualInline} is nullish, but it was expected not to be nullish.`,
  })
}
