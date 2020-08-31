import { smartEq } from '../validators/common'

export interface MockCall {
  args: any[]
  result: { type: 'return'; value: any } | { type: 'throw'; error: any }
}

type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never

export interface Mock<ARGS extends any[], RETURN> {
  /** Calls the mock function */
  (...args: ARGS): RETURN
  calls: MockCall[]
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
  executes(implementation: (...args: ARGS) => RETURN): Mock<ARGS, RETURN>
  /**
   * Schedules the mock to use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation function to execute.
   */
  executesOnce(implementation: (...args: ARGS) => RETURN): Mock<ARGS, RETURN>

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
   * @param value value to be returned.
   */
  rejectsWithOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>

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
     * @param value value to be returned.
     */
    rejectsWithOnce(value: Awaited<RETURN>): Mock<ARGS, RETURN>
  }
}

interface ReturnSpec {
  type: 'return'
  value: any
}

interface ThrowSpec {
  type: 'throw'
  error: any
}

interface ExecSpec {
  type: 'exec'
  implementation: (...args: any[]) => any
}

type Spec = ReturnSpec | ThrowSpec | ExecSpec

interface Override {
  args: any[]
  spec: Spec
}

// @todo: ARGS can be added here easily with TS 4.0
export function mockFn<RETURN = any>(defaultImpl?: (...args: any[]) => RETURN): Mock<any[], RETURN> {
  let spec: Spec = {
    type: 'return',
    value: undefined,
  }
  let queue: Spec[] = []
  let oneTimeOverrides: Override[] = []
  let recurringOverrides: Override[] = []

  function mock(...args: any[]) {
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

  mock.calls = [] as MockCall[]
  mock.isExhausted = function () {
    return queue.length === 0 && oneTimeOverrides.length === 0
  }

  function runSpec(spec: Spec, args: any[]) {
    switch (spec.type) {
      case 'return':
        mock.calls.push({ args, result: { type: 'return', value: spec.value } })
        return spec.value
      case 'throw':
        mock.calls.push({ args, result: { type: 'throw', error: spec.error } })
        throw spec.error
      case 'exec':
        try {
          const value = spec.implementation(...args)
          mock.calls.push({ args, result: { type: 'return', value } })
          return value
        } catch (error) {
          mock.calls.push({ args, result: { type: 'throw', error } })
          throw error
        }
    }
  }

  function reset(newSpec: Spec) {
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

  mock.resolvesTo = function (value: any) {
    reset({ type: 'return', value: Promise.resolve(value) })
    return mock
  }
  mock.resolvesToOnce = function (value: any) {
    queue.push({ type: 'return', value: Promise.resolve(value) })
    return mock
  }

  mock.rejectsWith = function (value: any) {
    reset({ type: 'return', value: Promise.reject(value) })
    return mock
  }
  mock.rejectsWithOnce = function (value: any) {
    queue.push({ type: 'return', value: Promise.reject(value) })
    return mock
  }

  mock.given = function (...args: any[]) {
    return {
      returnsOnce(value: any) {
        oneTimeOverrides.push({ args, spec: { type: 'return', value } })
        return mock
      },

      throwsOnce(error: any) {
        oneTimeOverrides.push({ args, spec: { type: 'throw', error } })
        return mock
      },

      executesOnce(implementation: (...args: any[]) => any) {
        oneTimeOverrides.push({ args, spec: { type: 'exec', implementation } })
        return mock
      },

      resolvesToOnce(value: any) {
        oneTimeOverrides.push({ args, spec: { type: 'return', value: Promise.resolve(value) } })
        return mock
      },

      rejectsWithOnce(value: any) {
        oneTimeOverrides.push({ args, spec: { type: 'return', value: Promise.reject(value) } })
        return mock
      },
    }
  }

  if (defaultImpl) {
    mock.executes(defaultImpl)
  }

  return mock
}
