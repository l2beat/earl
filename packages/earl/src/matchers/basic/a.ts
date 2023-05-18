import { registerMatcher } from '../../expect.js'

export type Newable<T> = new (...args: any[]) => T

export type NewableOrPrimitive =
  | Newable<any>
  | SymbolConstructor
  | BigIntConstructor

export type ConstructorToInstance<T extends NewableOrPrimitive> =
  T extends SymbolConstructor
    ? symbol
    : T extends BigIntConstructor
    ? bigint
    : T extends NumberConstructor
    ? number
    : T extends StringConstructor
    ? string
    : T extends BooleanConstructor
    ? boolean
    : T extends FunctionConstructor
    ? Function
    : T extends ArrayConstructor
    ? never[]
    : T extends ObjectConstructor
    ? any // is there a better way to type any object?
    : T extends Newable<infer N>
    ? N
    : never

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches an instance of a provided class or a primitive type. It is
     * compatible with built-in types like strings, numbers, and dates.
     *
     * Using this matcher is recommended when you don't care about the exact
     * value as long as it matches a given type.
     *
     * If you want to match a top level value, use `expect(...).toBeA(type)`
     * instead.
     *
     * @param type - The class or primitive constructor to match against.
     *
     * @example
     * ```ts
     * // Primitives
     * expect({ foo: Math.random() }).toEqual({ foo: expect.a(Number) })
     *
     * // Classes
     * expect({
     *   employee: new Employee('John Doe', 42),
     *   birthday: new Date('1990-01-01'),
     * }).toEqual({
     *   employee: expect.a(Employee),
     *   birthday: expect.a(Date),
     * })
     * ```
     */
    a<T extends NewableOrPrimitive>(type: T): ConstructorToInstance<T>
  }
}

registerMatcher('a', a, (type) => `a(${type.name})`)

export function a(type: NewableOrPrimitive) {
  return (value: unknown) => {
    if (type === String) {
      return typeof value === 'string'
    } else if (type === Number) {
      return typeof value === 'number' && !isNaN(value)
    } else if (type === Boolean) {
      return typeof value === 'boolean'
    } else if (type === BigInt) {
      return typeof value === 'bigint'
    } else if (type === Function) {
      return typeof value === 'function'
    } else if (type === Object) {
      return typeof value === 'object' && value !== null
    } else if (type === Symbol) {
      return typeof value === 'symbol'
    } else if (type === Array) {
      return Array.isArray(value)
    } else {
      return value instanceof type
    }
  }
}
