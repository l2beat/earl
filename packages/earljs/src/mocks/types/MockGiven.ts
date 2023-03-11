import { Mock } from './index'
import { Awaited } from './util'

export interface MockGiven<
  TArgs extends any[],
  TReturn,
  TGivenArgs extends TArgs,
> {
  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  returnsOnce(value: TReturn): Mock<TArgs, TReturn>

  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  throwsOnce(error: any): Mock<TArgs, TReturn>

  /**
   * Schedules the mock use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation - function to execute.
   */
  executesOnce(
    implementation: (...args: TGivenArgs) => TReturn,
  ): Mock<TArgs, TReturn>

  /**
   * Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value - value to be returned.
   */
  resolvesToOnce(value: Awaited<TReturn>): Mock<TArgs, TReturn>

  /**
   * Schedules the mock to reject with value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error - error to be thrown.
   */
  rejectsWithOnce(error: any): Mock<TArgs, TReturn>
}
