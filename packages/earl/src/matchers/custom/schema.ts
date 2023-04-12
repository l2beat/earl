import { registerMatcher } from '../../expect.js'

export interface ZodSchema {
  parse(value: unknown): any
}

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches values conforming to the provided zod schema.
     *
     * If you want to match a top level value, use
     * `expect(...).toMatchSchema(schema)` instead.
     *
     * @param schema - The zod schema to use.
     *
     * @example
     * ```ts
     * import * as z from 'zod'
     * const product = await getLatestProduct()
     * expect(product).toEqual({
     *   name: 'Turbocharger 9000',
     *   uuid: expect.schema(z.string().uuid()),
     *   pricing: expect.schema(
     *     z.object({
     *       price: z.number().positive(),
     *       currency: z.string().length(3),
     *     }),
     *   ),
     * })
     * ```
     */
    schema(schema: ZodSchema): never
  }
}

registerMatcher('schema', schema, () => 'schema(???)')

export function schema(schema: ZodSchema) {
  return (value: unknown) => {
    try {
      schema.parse(value)
      return true
    } catch {
      return false
    }
  }
}
