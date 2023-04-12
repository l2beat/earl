import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { schema, ZodSchema } from '../../matchers/custom/schema.js'

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that the value conforms to the provided zod schema.
     *
     * If you want to match a nested value, use the matcher
     * `expect.schema(schema)` instead.
     *
     * @param schema - The zod schema to use.
     *
     * @example
     * ```ts
     * import * as z from 'zod'
     * const Pricing = z.object({
     *   price: z.number().positive(),
     *   currency: z.string().length(3),
     * })
     *
     * expect({
     *   price: 1299,
     *   currency: 'USD',
     * }).toMatchSchema(Pricing)
     *
     * expect({
     *   price: -1,
     *   currency: 'error',
     * }).not.toMatchSchema(Pricing)
     * ```
     */
    toMatchSchema(schema: ZodSchema): void
  }
}

registerValidator('toMatchSchema', toMatchSchema)

export function toMatchSchema(control: Control, expected: ZodSchema) {
  const actualInline = formatCompact(control.actual)

  control.assert({
    success: schema(expected)(control.actual),
    reason: `The value ${actualInline} does not match the given schema, but it was expected to match.`,
    negatedReason: `The value ${actualInline} matches the given schema, but it was expected not to match.`,
  })
}
