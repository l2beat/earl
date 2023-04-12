import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { falsy } from '../../matchers/basic/falsy.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a value is falsy, as defined by:
     * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
     *
     * You can also use its sister validator, `toBeTruthy`, to match the
     * opposite.
     *
     * If you want to match a nested value, use the matcher `expect.falsy()`
     * instead.
     *
     * @example
     * ```ts
     * expect(0).toBeFalsy()
     * expect('').toBeFalsy()
     * expect(false).toBeFalsy()
     * expect(null).toBeFalsy()
     *
     * expect(1).not.toBeFalsy()
     * expect('foo').not.toBeFalsy()
     * expect(true).not.toBeFalsy()
     * expect({ x: 1, y: 2 }).not.toBeFalsy()
     * ```
     */
    toBeFalsy(): void
  }
}

registerValidator('toBeFalsy', toBeFalsy)

export function toBeFalsy(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: falsy()(control.actual),
    reason: `The value ${actualInline} is not falsy, but it was expected to be falsy.`,
    negatedReason: `The value ${actualInline} is falsy, but it was expected not to be falsy.`,
  })
}
