import { MockGiven } from './MockGiven'
import { Awaited } from './util'

export interface MockCall<TArgs, TReturn> {
  args: TArgs
  result: { type: 'return'; value: TReturn } | { type: 'throw'; error: any }
}

export interface Mock<TArgs extends any[], TReturn> {
  /**
   * Calls the mock function.
   */
  (...args: TArgs): TReturn

  /**
   * An array containing all the performed calls.
   */
  calls: MockCall<TArgs, TReturn>[]

  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  isExhausted(): boolean

  /**
   * Sets the return value of calls to the Mock.
   * Overrides any previous configuration.
   * @param value - value to be returned.
   */
  returns(value: TReturn): Mock<TArgs, TReturn>
  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  returnsOnce(value: TReturn): Mock<TArgs, TReturn>

  /**
   * Sets the error thrown by calls to the Mock.
   * Overrides any previous configuration.
   * @param error - error to be thrown.
   */
  throws(error: any): Mock<TArgs, TReturn>
  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  throwsOnce(error: any): Mock<TArgs, TReturn>

  /**
   * Sets the underlying implementation of the Mock.
   * Overrides any previous configuration.
   * @param implementation - function to execute.
   */
  executes(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>
  /**
   * Schedules the mock to use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation - function to execute.
   */
  executesOnce(implementation: (...args: TArgs[]) => TReturn): Mock<TArgs, TReturn>

  /**
   * Sets the return value wrapped in Promise.resolve of calls to the Mock.
   * @param value - value to be returned.
   */
  resolvesTo(value: Awaited<TReturn>): Mock<TArgs, TReturn>
  /**
   * Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  resolvesToOnce(value: Awaited<TReturn>): Mock<TArgs, TReturn>

  /**
   * Sets the error rejected by calls to the Mock.
   * @param error - error to be thrown.
   */
  rejectsWith(error: any): Mock<TArgs, TReturn>
  /**
   * Schedules the mock to reject with value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  rejectsWithOnce(error: any): Mock<TArgs, any>

  /**
   * Specifies a different behavior when other arguments are given
   * @param args - arguments to match
   */
  given<TGivenArgs extends TArgs>(...args: TGivenArgs): MockGiven<TArgs, TReturn, TGivenArgs>
}

export type MockArgs<T> = T extends Mock<infer Args, any> ? Args : never

export namespace Mock {
  export type Of<T extends (...args: any[]) => any> = Mock<Parameters<T>, ReturnType<T>>
}
