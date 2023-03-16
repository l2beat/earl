import { Control } from '../Control'
import { registerValidator } from '../expect'
import { format, formatCompact } from '../format'
import { length } from '../matchers/length'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toHaveLength(
      this: Validators<string | any[] | { length: number }>,
      length: number,
    ): void
  }
}

registerValidator('toHaveLength', toHaveLength)

export function toHaveLength(control: Control<unknown>, expected: number) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)
  control.assert({
    success: length(expected)(control.actual),
    reason: `${actualInline} doesn't have length ${expectedInline}`,
    negatedReason: `${actualInline} has length ${expectedInline}`,
    actual: format(getLength(control.actual), null),
    expected: format(expected, null),
  })
}

function getLength(value: unknown) {
  try {
    return (value as any).length
  } catch {
    return undefined
  }
}
