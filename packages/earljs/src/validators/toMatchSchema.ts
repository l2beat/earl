import { Control } from '../Control'
import { registerValidator } from '../expect'
import { formatCompact } from '../format'
import { Schema, schema } from '../matchers/schema'

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
    reason: `${actualInline} doesn't match the given schema`,
    negatedReason: `${actualInline} matches the given schema`,
  })
}
