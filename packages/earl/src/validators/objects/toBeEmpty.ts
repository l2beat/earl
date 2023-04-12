import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { empty } from '../../matchers/objects/empty.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a string, array, sets or map is empty.
     *
     * If you want to match a nested value, use the matcher `expect.empty()`
     * instead.
     *
     * @example
     * ```ts
     * expect([]).toBeEmpty()
     * expect(new Map()).toBeEmpty()
     *
     * expect('foo').not.toBeEmpty()
     * expect(new Set([1, 2, 3])).not.toBeEmpty()
     * ```
     */
    toBeEmpty(this: Validators<string | any[] | Set<any> | Map<any, any>>): void
  }
}

registerValidator('toBeEmpty', toBeEmpty)

export function toBeEmpty(control: Control) {
  const actualInline = formatCompact(control.actual)
  control.assert({
    success: empty()(control.actual),
    reason: `The value ${actualInline} is not empty, but it was expected to be empty.`,
    negatedReason: `The value ${actualInline} is empty, but it was expected not to be empty.`,
  })
}
