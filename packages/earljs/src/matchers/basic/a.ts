import { registerMatcher } from '../../expect'

export type Newable<T> = new (...args: any[]) => T

export type NewableOrPrimitive =
  | Newable<any>
  | SymbolConstructor
  | BigIntConstructor

declare module '../../expect' {
  interface Matchers {
    /**
     * Matches an instance of a provided class or a primitive type. Works as
     * expected with builtin types like strings, numbers, dates.
     *
     * @example
     * ```ts
     * // matches `new MyClass()` and `new MySubClass()` if `MySubClass` extends `MyClass`
     * // doesn't match `new Other()`
     * expect.a(MyClass)
     *
     * // matches `"foo"`
     * // doesn't match `new String("foo")` or `123`
     * expect.a(String)
     *
     * // matches `123` and `-5.5`
     * // doesn't match `NaN` or `"123"`
     * expect.a(Number)
     *
     * // matches `{}`, `{ a: 1 }` and `new MyClass()`
     * // doesn't match `123`, "foo" or `null`
     * expect.a(Object)
     * ```
     *
     * @param type - class or primitive constructor to match against.
     */
    a<T extends NewableOrPrimitive>(type: T): never
  }
}

registerMatcher('a', a, (clazz) => `a(${clazz.name})`)

export function a(clazz: NewableOrPrimitive) {
  return (value: unknown) => {
    if (clazz === String) {
      return typeof value === 'string'
    } else if (clazz === Number) {
      return typeof value === 'number' && !isNaN(value)
    } else if (clazz === Boolean) {
      return typeof value === 'boolean'
    } else if (clazz === BigInt) {
      return typeof value === 'bigint'
    } else if (clazz === Function) {
      return typeof value === 'function'
    } else if (clazz === Object) {
      return typeof value === 'object' && value !== null
    } else if (clazz === Symbol) {
      return typeof value === 'symbol'
    } else if (clazz === Array) {
      return Array.isArray(value)
    } else {
      return value instanceof clazz
    }
  }
}
