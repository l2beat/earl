import type { Expectation } from './Expectation'

export interface Modifiers<T> {
  /**
   * Inverts the behaviour of the validator that follows.
   */
  get not(): Expectation<T>
}
