import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { isEqual } from '../../isEqual/index.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that a value is equal to another value. The equality is checked
     * using the `isEqual` function. This means that it checks objects
     * recursively, accounts for object prototypes and uses same value zero
     * algorithm for primitives.
     *
     * This validator also supports asymmetric matchers on the expected value.
     *
     * Because this validator also works on the type level you will receive
     * editor suggestions for the properties on the expected value based on the
     * actual value.
     *
     * To opt out of type checking you can explicitly provide `unknown` as the
     * type parameter.
     * ```ts
     * expect<unknown>(1).not.toEqual('foo')
     * ```
     *
     * If you would like instead to check values for referential equality use
     * the `toExactlyEqual` validator instead.
     *
     * Alternatively if you would like to ignore type level checks and object
     * prototypes use the `toLooseEqual` validator instead.
     *
     * @param expected - The expected value. Can include nested matchers.
     *
     * @example
     * ```ts
     * expect(1).toEqual(1)
     * expect(2).not.toEqual(3)
     *
     * expect({ foo: 'bar' }).toEqual({ foo: 'bar' })
     *
     * expect({ x: 15, y: -20 }).toEqual({
     *   x: expect.greaterThan(0),
     *   y: expect.lessThan(0),
     * })
     *
     * // type-error: the type string is not assignable to number
     * expect(123).not.toEqual('foo')
     * ```
     */
    toEqual(expected: T): void
  }
}

registerValidator('toEqual', toEqual)

export function toEqual(control: Control, expected: unknown) {
  const actualInline = formatCompact(control.actual)
  const expectedInline = formatCompact(expected)

  control.assert({
    success: isEqual(control.actual, expected),
    reason: `The value ${actualInline} is not equal to ${expectedInline}, but it was expected to be equal.`,
    negatedReason: `The value ${actualInline} is equal to ${expectedInline}, but it was expected not to be equal.`,
    actual: control.actual,
    expected,
  })
}
