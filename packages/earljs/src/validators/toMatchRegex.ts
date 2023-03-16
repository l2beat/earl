import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { regex } from '../matchers/regex'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toMatchRegex(this: Validators<string>, regex: RegExp): void
  }
}

registerValidator('toMatchRegex', toMatchRegex)

export function toMatchRegex(control: Control<unknown>, expected: RegExp) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: regex(expected)(control.actual),
    reason: `${actualInline} doesn't match ${expectedInline}`,
    negatedReason: `${actualInline} matches ${expectedInline}`,
  })
}
