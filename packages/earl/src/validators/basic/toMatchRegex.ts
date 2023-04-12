import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { regex } from '../../matchers/basic/regex.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that the value is a string matching the given regular expression.
     *
     * If you want to match a nested value, use the matcher
     * `expect.regex(regex)` instead.
     *
     * @param regex - The regular expression to test the matched values.
     *
     * @example
     * ```ts
     * expect('I like pancakes').toMatchRegex(/like/)
     *
     * expect('foo').not.toMatchRegex(/^d+$/)
     * ```
     */
    toMatchRegex(this: Validators<string>, regex: RegExp): void
  }
}

registerValidator('toMatchRegex', toMatchRegex)

export function toMatchRegex(control: Control, expected: RegExp) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: regex(expected)(control.actual),
    reason: `The value ${actualInline} does not match ${expectedInline}, but it was expected to match.`,
    negatedReason: `The value ${actualInline} matches ${expectedInline}, but it was expected not to match.`,
  })
}
