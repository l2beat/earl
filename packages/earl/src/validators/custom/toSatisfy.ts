import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { satisfies } from '../../matchers/custom/satisfies.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that the provided predicate returns a truthy result for the given
     * value.
     *
     * Usually other validators are more appropriate, but this can be useful if
     * you are testing something custom.
     *
     * If you want to match a nested value, use the matcher
     * `expect.satisfies(predicate)` instead.
     *
     * @param predicate - The function for checking values.
     *
     * @example
     * ```ts
     * function isShark(value: unknown) {
     *   return value instanceof Fish && value.species === 'shark'
     * }
     * expect(new Fish('Bobby', { species: 'shark' })).toSatisfy(isShark)
     * ```
     */
    toSatisfy(predicate: (value: T) => boolean): void
  }
}

registerValidator('toSatisfy', toSatisfy)

export function toSatisfy(
  control: Control,
  predicate: (value: unknown) => boolean,
) {
  const actualInline = formatCompact(control.actual)

  control.assert({
    success: satisfies(predicate)(control.actual),
    reason: `The value ${actualInline} does not satisfy the given predicate, but it was expected to satisfy it.`,
    negatedReason: `The value ${actualInline} satisfies the given predicate, but it was expected not to satisfy it.`,
  })
}
