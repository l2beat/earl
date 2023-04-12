import { MockFunction } from './MockFunction.js'
import { Awaited } from './util.js'

export interface MockGiven<
  TArgs extends any[],
  TReturn,
  TGivenArgs extends TArgs,
> {
  /**
   * Adds a parameter override for the mock to return a value the next time it's
   * called with the provided parameters. If another parameter override is
   * already scheduled it will be used first.
   *
   * @param value - The value to be returned.
   */
  returnsOnce(value: TReturn): MockFunction<TArgs, TReturn>

  /**
   * Adds a parameter override for the mock to throw an error the next time it's
   * called with the provided parameters. If another parameter override is
   * already scheduled it will be used first.
   *
   * @param error - The error to be thrown.
   */
  throwsOnce(error: any): MockFunction<TArgs, TReturn>

  /**
   * Adds a parameter override for the mock to use the provided implementation
   * the next time it's called with the provided parameters. If another
   * parameter override is already scheduled it will be used first.
   *
   * @param implementation - The function to execute.
   */
  executesOnce(
    implementation: (...args: TGivenArgs) => TReturn,
  ): MockFunction<TArgs, TReturn>

  /**
   * Adds a parameter override for the mock to return a promise with the given
   * value the next time it's called with the provided parameters. If another
   * parameter override is already scheduled it will be used first.
   *
   * @param value - The value to be returned as a Promise.
   */
  resolvesToOnce(value: Awaited<TReturn>): MockFunction<TArgs, TReturn>

  /**
   * Adds a parameter override for the mock to return a promise rejected with
   * the given error the next time it's called with the provided parameters. If
   * another parameter override is already scheduled it will be used first.
   *
   * @param error - The error to be rejected inside the promise.
   */
  rejectsWithOnce(error: any): MockFunction<TArgs, TReturn>
}
