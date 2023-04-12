import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { length } from '../../matchers/objects/length.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a string, array or object with a `length` property has a
     * specific length.
     *
     * If you want to match a nested value, use the matcher
     * `expect.length(length)` instead.
     *
     * @param length - The expected length. Can be a matcher.
     *
     * @example
     * ```ts
     * expect('abcdef').toHaveLength(6)
     * expect([1, 2, 3]).toHaveLength(expect.greaterThan(2))
     *
     * expect({ length: 5 }).not.toHaveLength(4)
     * ```
     */
    toHaveLength(
      this: Validators<string | any[] | { length: number }>,
      length: number,
    ): void
  }
}

registerValidator('toHaveLength', toHaveLength)

export function toHaveLength(control: Control, expected: number) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)
  control.assert({
    success: length(expected)(control.actual),
    reason: `The value ${actualInline} does not have length ${expectedInline}, but it was expected to.`,
    negatedReason: `The value ${actualInline} has length ${expectedInline}, but it was expected not to.`,
    actual: getLength(control.actual),
    expected: expected,
  })
}

function getLength(value: unknown) {
  try {
    return (value as any).length
  } catch {
    return undefined
  }
}
