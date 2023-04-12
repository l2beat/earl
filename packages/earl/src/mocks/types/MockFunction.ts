import { MockGiven } from './MockGiven.js'
import { Awaited } from './util.js'

export interface MockCall<TArgs, TReturn> {
  args: TArgs
  result: { type: 'return'; value: TReturn } | { type: 'throw'; error: any }
}

export interface MockFunction<A extends any[], R> {
  /**
   * Calls the mock function.
   */
  (...args: A): R

  /**
   * An array containing all the performed calls.
   */
  calls: MockCall<A, R>[]

  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  isExhausted(): boolean

  /**
   * Returns the number of remaining overrides that have yet to be used, e.g.
   * `returnsOnce`.
   */
  getOneTimeOverridesLength(): number

  /**
   * Returns the number of remaining parameter overrides that have yet to be
   * used, `e.g. given(...).returnsOnce(...)`.
   */
  getParameterOverridesLength(): number

  /**
   * Changes the default behavior to return the provided value. Replaces any
   * previous default behavior. Does not affect overrides.
   *
   * @param value - The value to be returned.
   */
  returns(value: R): MockFunction<A, R>

  /**
   * Adds a one time override for the mock to return a value the next time it's
   * called. If another one time override is already scheduled it will be used
   * first.
   *
   * @param value - The value to be returned.
   */
  returnsOnce(value: R): MockFunction<A, R>

  /**
   * Changes the default behavior to throw the provided error. Replaces any
   * previous default behavior. Does not affect overrides.
   *
   * @param error - The error to be thrown.
   */
  throws(error: unknown): MockFunction<A, R>

  /**
   * Adds a one time override for the mock to throw an error the next time it's
   * called. If another one time override is already scheduled it will be used
   * first.
   *
   * @param error - The error to be thrown.
   */
  throwsOnce(error: any): MockFunction<A, R>

  /**
   * Changes the default behavior to execute the given implementation. Replaces
   * any previous default behavior. Does not affect overrides.
   *
   * @param implementation - The function to execute.
   */
  executes(implementation: (...args: A) => R): MockFunction<A, R>

  /**
   * Adds a one time override for the mock to use the provided implementation
   * the next time it's called. If another one time override is already
   * scheduled it will be used first.
   *
   * @param implementation - The function to execute.
   */
  executesOnce(implementation: (...args: A) => R): MockFunction<A, R>

  /**
   * Changes the default behavior to return a promise with the given value.
   * Replaces any previous default behavior. Does not affect overrides.
   *
   * @param value - The value to be returned as a Promise.
   */
  resolvesTo(value: Awaited<R>): MockFunction<A, R>

  /**
   * Adds a one time override for the mock to return a promise with the given
   * value the next time it's called. If another one time override is already
   * scheduled it will be used first.
   *
   * @param value - The value to be returned as a Promise.
   */
  resolvesToOnce(value: Awaited<R>): MockFunction<A, R>

  /**
   * Changes the default behavior to return a promise rejected with the given
   * error. Replaces any previous default behavior. Does not affect overrides.
   *
   * @param error - The error to be rejected inside the promise.
   */
  rejectsWith(error: any): MockFunction<A, R>

  /**
   * Adds a one time override for the mock to return a promise rejected with the
   * given error the next time it's called. If another one time override is
   * already scheduled it will be used first.
   *
   * @param error - The error to be rejected inside the promise.
   */
  rejectsWithOnce(error: any): MockFunction<A, any>

  /**
   * Resets the mock to its initial state. If there was a default implementation
   * it will be restored.
   */
  reset(): void

  /**
   * Specifies a different behavior when other arguments are given.
   *
   * @param args - The arguments to match.
   */
  given<B extends A>(...args: B): MockGiven<A, R, B>
}

export type MockParameters<T> = T extends MockFunction<infer A, any> ? A : never

export type MockFunctionOf<T extends (...args: any[]) => any> = MockFunction<
  Parameters<T>,
  ReturnType<T>
>
