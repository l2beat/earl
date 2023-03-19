import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { regex } from '../../matchers/basic/regex'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toMatchRegex(this: Validators<string, R>, regex: RegExp): R
  }
}

registerValidator('toMatchRegex', toMatchRegex)

export function toMatchRegex(control: Control<unknown>, expected: RegExp) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: regex(expected)(control.actual),
    reason: `The value ${actualInline} does not match ${expectedInline}, but it was expected to match.`,
    negatedReason: `The value ${actualInline} matches ${expectedInline}, but it was expected not to match.`,
  })
}
