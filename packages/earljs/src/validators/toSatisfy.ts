import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { satisfies } from '../matchers/custom/satisfies'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toSatisfy(predicate: (value: T) => boolean): void
  }
}

registerValidator('toSatisfy', toSatisfy)

export function toSatisfy(
  control: Control<unknown>,
  predicate: (value: unknown) => boolean,
) {
  const actualInline = formatCompact(control.actual)

  control.assert({
    success: satisfies(predicate)(control.actual),
    reason: `The value ${actualInline} does not satisfy the given predicate, but it was expected to satisfy it.`,
    negatedReason: `The value ${actualInline} satisfies the given predicate, but it was expected not to satisfy it.`,
  })
}
