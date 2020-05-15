import { smartEq } from '../matchers/toEqual'

export interface Mock<A extends any[], T> {
  /** Calls the mock function */
  (...args: A): T
  /**
   * Sets the return value of calls to the Mock.
   * Overrides any previous configuration.
   * @param value value to be returned.
   */
  returns <U> (value: U): Mock<any[], U>
  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value value to be returned.
   */
  returnsOnce <U> (value: U): Mock<A, T | U>
  /**
   * Sets the error thrown by calls to the Mock.
   * Overrides any previous configuration.
   * @param error error to be thrown.
   */
  throws (error: any): Mock<any[], never>
  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error error to be thrown.
   */
  throwsOnce (error: any): Mock<A, T>
  /** 
   * Sets the underlying implementation of the Mock.
   * Overrides any previous configuration.
   * @param implementation function to execute.
   */
  executes <B extends any[], U> (implementation: (...args: B) => U): Mock<B, U>
  /**
   * Schedules the mock use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation function to execute.
   */
  executesOnce <B extends A, U> (implementation: (...args: B) => U): Mock<B, T | U>
  /**
   * Specifies a different behavior when other arguments are given
   * @param args arguments to match
   */
  given <B extends A>(...args: B): {
    /**
     * Sets the return value of calls to the Mock.
     * @param value value to be returned.
     */
    returns <U> (value: U): Mock<A, T | U>
    /**
     * Schedules the mock to return a value the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param value value to be returned.
     */
    returnsOnce <U> (value: U): Mock<A, T | U>
    /**
     * Sets the error thrown by calls to the Mock.
     * @param error error to be thrown.
     */
    throws (error: any): Mock<A, T>
    /**
     * Schedules the mock to throw an error the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param error error to be thrown.
     */
    throwsOnce (error: any): Mock<A, T>
    /** 
     * Sets the underlying implementation of the Mock.
     * @param implementation function to execute.
     */
    executes <U> (implementation: (...args: B) => U): Mock<A, T | U>
    /**
     * Schedules the mock use the provided implementation the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param implementation function to execute.
     */
    executesOnce <U> (implementation: (...args: B) => U): Mock<A, T | U>
  }
}

interface ReturnSpec {
  type: 'return',
  value: any,
}

interface ThrowSpec {
  type: 'throw',
  error: any,
}

interface ExecSpec {
  type: 'exec',
  implementation: (...args: any[]) => any,
}

type Spec = ReturnSpec | ThrowSpec | ExecSpec

interface Override {
  args: any[],
  spec: Spec,
}

export function mockFn (): Mock<any[], undefined> {
  let spec: Spec = {
    type: 'return',
    value: undefined
  }
  let queue: Spec[] = []
  let oneTimeOverrides: Override[] = []
  let recurringOverrides: Override[] = []

  function mock (...args: any[]) {
    for (const override of oneTimeOverrides) {
      if (smartEq(args, override.args)) {
        oneTimeOverrides.splice(oneTimeOverrides.indexOf(override), 1)
        return runSpec(override.spec, args)
      }
    }
    for (const override of recurringOverrides) {
      if (smartEq(args, override.args)) {
        return runSpec(override.spec, args)
      }
    }
    const current = queue.shift() || spec
    return runSpec(current, args)
  }

  function runSpec (spec: Spec, args: any[]) {
    switch (spec.type) {
      case 'return': return spec.value
      case 'throw': throw spec.error
      case 'exec': return spec.implementation(...args)
    }
  }

  function reset (newSpec: Spec) {
    spec = newSpec
    queue = []
    oneTimeOverrides = []
    recurringOverrides = []
  }

  mock.returns = function (value: any) {
    reset({ type: 'return', value })
    return mock
  }

  mock.returnsOnce = function (value: any) {
    queue.push({ type: 'return', value })
    return mock
  }

  mock.throws = function (error: any) {
    reset({ type: 'throw', error })
    return mock
  }

  mock.throwsOnce = function (error: any) {
    queue.push({ type: 'throw', error })
    return mock
  }

  mock.executes = function (implementation: (...args: any[]) => any) {
    reset({ type: 'exec', implementation })
    return mock
  }

  mock.executesOnce = function (implementation: (...args: any[]) => any) {
    queue.push({ type: 'exec', implementation })
    return mock
  }

  mock.given = function (...args: any[]) {
    return {
      returns (value: any) {
        recurringOverrides.push({ args, spec: { type: 'return', value } })
        return mock
      },

      returnsOnce (value: any) {
        oneTimeOverrides.push({ args, spec: { type: 'return', value } })
        return mock
      },

      throws (error: any) {
        recurringOverrides.push({ args, spec: { type: 'throw', error } })
        return mock
      },

      throwsOnce (error: any) {
        oneTimeOverrides.push({ args, spec: { type: 'throw', error } })
        return mock
      },

      executes (implementation: (...args: any[]) => any) {
        recurringOverrides.push({ args, spec: { type: 'exec', implementation } })
        return mock
      },

      executesOnce (implementation: (...args: any[]) => any) {
        oneTimeOverrides.push({ args, spec: { type: 'exec', implementation } })
        return mock
      }
    }
  }

  return mock
}
