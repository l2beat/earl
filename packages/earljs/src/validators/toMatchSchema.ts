import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { Schema, schema } from '../matchers/custom/schema'

declare module '../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    toMatchSchema(schema: Schema<any>): void
  }
}

registerValidator('toMatchSchema', toMatchSchema)

export function toMatchSchema(
  control: Control<unknown>,
  expected: Schema<unknown>,
) {
  const actualInline = formatCompact(control.actual)

  control.assert({
    success: schema(expected)(control.actual),
    reason: `The value ${actualInline} does not match the given schema, but it was expected to match.`,
    negatedReason: `The value ${actualInline} matches the given schema, but it was expected not to match.`,
  })
}
