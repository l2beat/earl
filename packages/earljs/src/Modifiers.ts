import type { Expectation } from './Expectation'

export interface Modifiers<T> {
  /**
   * Inverts the behaviour of the validator that follows.
   *
   * @example
   * ```ts
   * expect(3).toEqual(4) // ❌
   * expect(3).not.toEqual(4) // ✅
   * ```
   */
  get not(): Expectation<T>
}
