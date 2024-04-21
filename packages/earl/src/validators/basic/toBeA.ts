import type { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { type NewableOrPrimitive, a } from '../../matchers/basic/a.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that the value is an instance of a provided class or a primitive
     * type. It is compatible with built-in types like strings, numbers, and
     * dates.
     *
     * If you want to match a nested value, use the matcher `expect.a(type)`
     * instead.
     *
     * @param type - The class or primitive constructor to match against.
     *
     * @example
     * ```ts
     * // Primitives
     * expect(123).toBeA(Number)
     * expect('foo').not.toBeA(Boolean)
     *
     * // Classes
     * expect(new Person('John', 'Doe')).toBeA(Person)
     * ```
     */
    toBeA<C extends NewableOrPrimitive>(type: C): void
  }
}

registerValidator('toBeA', toBeA)

export function toBeA(control: Control, type: NewableOrPrimitive) {
  const actualInline = formatCompact(control.actual)
  const typeInline = getTypeName(type)

  control.assert({
    success: a(type)(control.actual),
    reason: `The value ${actualInline} is not ${typeInline}, but it was expected to be ${typeInline}.`,
    negatedReason: `The value ${actualInline} is ${typeInline}, but it was expected not to be ${typeInline}.`,
  })
}

function getTypeName(type: NewableOrPrimitive) {
  if (type === String) {
    return 'a string'
  }
  if (type === Number) {
    return 'a number'
  }
  if (type === Boolean) {
    return 'a boolean'
  }
  if (type === BigInt) {
    return 'a bigint'
  }
  if (type === Function) {
    return 'a function'
  }
  if (type === Object) {
    return 'an object'
  }
  if (type === Symbol) {
    return 'a symbol'
  }
  if (type === Array) {
    return 'an array'
  }
  if (typeof type === 'function') {
    return `an instance of ${type.name}`
  }
  return `an instance of ${formatCompact(type)}`
}
