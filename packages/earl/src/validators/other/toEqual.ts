import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { isEqual } from '../../isEqual/index.js'

// marker type useful when Matcher matches multiple values
export type Matching<VALUES> = { __MATCHING: VALUES }

export type NonEmptyOnly<T> = keyof T extends never ? never : T

type Access<V, K> = V extends object
  ? K extends keyof V
    ? V[K]
    : never
  : never

export type ExpectedEqual<TLeft, TRight> = TRight extends Matching<infer U>
  ? TLeft extends U
    ? TRight // important bit here: we return original Matching<X|Y|Z> type
    : ExpectedEqual<TLeft, U>
  : TRight extends TLeft
  ? TRight
  : NonEmptyOnly<
      TLeft extends object
        ? { [K in keyof TLeft]: ExpectedEqual<TLeft[K], Access<TRight, K>> }
        : never
    >

declare module '../../expect.js' {
  interface Validators<TLeft> {
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
    toEqual<TRight>(expected: ExpectedEqual<TLeft, TRight>): void
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
