import { registerMatcher } from '../expect'

export interface Schema<T> {
  parse(value: unknown): T
}

declare module '../expect' {
  interface Matchers {
    /**
     * Matches values conforming to a schema.
     *
     * @example
     * ```ts
     * import * as z from 'zod'
     * const Person = z.object({
     *   name: z.string(),
     *   age: z.number(),
     * })
     * expect.schema(Person)
     * ```
     *
     * @param regex - a regular expression to test the matched values.
     */
    schema<T>(schema: Schema<T>): T
  }
}

registerMatcher('schema', schema, () => 'schema(???)')

export function schema(schema: Schema<any>) {
  return (value: unknown) => {
    try {
      schema.parse(value)
      return true
    } catch {
      return false
    }
  }
}
