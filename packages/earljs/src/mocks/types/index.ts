import { MockGiven } from './MockGiven'
import { Awaited } from './util'

export interface MockCall<TArgs, TReturn> {
  args: TArgs
  result: { type: 'return'; value: TReturn } | { type: 'throw'; error: any }
}

export interface Mock<A extends any[], R> {
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
   * Sets the return value of calls to the Mock.
   * Overrides any previous configuration.
   * @param value - value to be returned.
   */
  returns(value: R): Mock<A, R>
  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  returnsOnce(value: R): Mock<A, R>

  /**
   * Sets the error thrown by calls to the Mock.
   * Overrides any previous configuration.
   * @param error - error to be thrown.
   */
  throws(error: any): Mock<A, R>
  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  throwsOnce(error: any): Mock<A, R>

  /**
   * Sets the underlying implementation of the Mock.
   * Overrides any previous configuration.
   * @param implementation - function to execute.
   */
  executes(implementation: (...args: A) => R): Mock<A, R>
  /**
   * Schedules the mock to use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation - function to execute.
   */
  executesOnce(implementation: (...args: A) => R): Mock<A, R>

  /**
   * Sets the return value wrapped in Promise.resolve of calls to the Mock.
   * @param value - value to be returned.
   */
  resolvesTo(value: Awaited<R>): Mock<A, R>
  /**
   * Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  resolvesToOnce(value: Awaited<R>): Mock<A, R>

  /**
   * Sets the error rejected by calls to the Mock.
   * @param error - error to be thrown.
   */
  rejectsWith(error: any): Mock<A, R>
  /**
   * Schedules the mock to reject with value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  rejectsWithOnce(error: any): Mock<A, any>

  /**
   * Specifies a different behavior when other arguments are given
   * @param args - arguments to match.
   */
  given<B extends A>(...args: B): MockGiven<A, R, B>
}

export type MockArgs<T> = T extends Mock<infer A, any> ? A : never

export type MockOf<T extends (...args: any[]) => any> = Mock<
  Parameters<T>,
  ReturnType<T>
>
