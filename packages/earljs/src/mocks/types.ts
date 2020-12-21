export interface MockCall<ARGS, RETURN> {
  args: ARGS
  result: { type: 'return'; value: RETURN } | { type: 'throw'; error: any }
}

export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never

export interface Mock<ARGS extends any[], RETURN> {
  /**
   * Calls the mock function.
   */
  (...args: ARGS): RETURN

  /**
   * An array containing all the performed calls.
   */
  calls: MockCall<ARGS, RETURN>[]

  /**
   * Checks if all the expected calls to the mock have been performed.
   */
  isExhausted(): boolean

  /**
   * Sets the return value of calls to the Mock.
   * Overrides any previous configuration.
   * @param value value to be returned.
   */
  returns(value: RETURN): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value value to be returned.
   */
  returnsOnce(value: RETURN): Mock<ARGS, RETURN>

  /**
   * Sets the error thrown by calls to the Mock.
   * Overrides any previous configuration.
   * @param error error to be thrown.
   */
  throws(error: any): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error error to be thrown.
   */
  throwsOnce(error: any): Mock<ARGS, RETURN>

  /**
   * Sets the underlying implementation of the Mock.
   * Overrides any previous configuration.
   * @param implementation function to execute.
   */
  executes(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation function to execute.
   */
  executesOnce(implementation: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>

  /**
   * Sets the return value wrapped in Promise.resolve of calls to the Mock.
   * @param value value to be returned.
   */
  resolvesTo(value: Awaited<RETURN>): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value value to be returned.
   */
  resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>

  /**
   * Sets the error rejected by calls to the Mock.
   * @param error error to be thrown.
   */
  rejectsWith(error: any): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to reject with value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error error to be thrown.
   */
  rejectsWithOnce(error: any): Mock<ARGS, any>

  /**
   * Specifies a different behavior when other arguments are given
   * @param args arguments to match
   */
  given<B extends ARGS>(
    ...args: B
  ): {
    /**
     * Schedules the mock to return a value the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param value value to be returned.
     */
    returnsOnce(value: RETURN): Mock<ARGS, RETURN>

    /**
     * Schedules the mock to throw an error the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param error error to be thrown.
     */
    throwsOnce(error: any): Mock<ARGS, RETURN>

    /**
     * Schedules the mock use the provided implementation the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param implementation function to execute.
     */
    executesOnce(implementation: (...args: B) => RETURN): Mock<ARGS, RETURN>

    /**
     * Schedules the mock to return value wrapped in Promise.resolve the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param value value to be returned.
     */
    resolvesToOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>

    /**
     * Schedules the mock to reject with value the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param error error to be thrown.
     */
    rejectsWithOnce(error: any): Mock<ARGS, RETURN>
  }
}

export type MockArgs<T> = T extends Mock<infer ARGS, any> ? ARGS : never
