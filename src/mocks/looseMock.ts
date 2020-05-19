import { defaultExecutionCtx } from '../ExecutionCtx'
import { smartEq } from '../validators/toEqual'

export interface MockCall {
  args: any[]
  result: { type: 'return'; value: any } | { type: 'throw'; error: any }
}

export interface LooseMock<A extends any[], T> {
  /** Calls the mock function */
  (...args: A): T
  calls: MockCall[]
  isExhausted(): boolean

  /**
   * Sets the return value of calls to the Mock.
   * Overrides any previous configuration.
   * @param value value to be returned.
   */
  returns<U>(value: U): LooseMock<any[], U>

  /**
   * Schedules the mock to return a value the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param value value to be returned.
   */
  returnsOnce<U>(value: U): LooseMock<A, T | U>

  /**
   * Sets the error thrown by calls to the Mock.
   * Overrides any previous configuration.
   * @param error error to be thrown.
   */
  throws(error: any): LooseMock<any[], never>

  /**
   * Schedules the mock to throw an error the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param error error to be thrown.
   */
  throwsOnce(error: any): LooseMock<A, T>

  /**
   * Sets the underlying implementation of the Mock.
   * Overrides any previous configuration.
   * @param implementation function to execute.
   */
  executes<B extends any[], U>(implementation: (...args: B) => U): LooseMock<B, U>

  /**
   * Schedules the mock use the provided implementation the next time it's called.
   * If anything is already scheduled it will be used first.
   * @param implementation function to execute.
   */
  executesOnce<B extends A, U>(implementation: (...args: B) => U): LooseMock<B, T | U>

  /**
   * Specifies a different behavior when other arguments are given
   * @param args arguments to match
   */
  given<B extends A>(
    ...args: B
  ): {
    /**
     * Sets the return value of calls to the Mock.
     * @param value value to be returned.
     */
    returns<U>(value: U): LooseMock<A, T | U>
    /**
     * Schedules the mock to return a value the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param value value to be returned.
     */
    returnsOnce<U>(value: U): LooseMock<A, T | U>
    /**
     * Sets the error thrown by calls to the Mock.
     * @param error error to be thrown.
     */
    throws(error: any): LooseMock<A, T>
    /**
     * Schedules the mock to throw an error the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param error error to be thrown.
     */
    throwsOnce(error: any): LooseMock<A, T>
    /**
     * Sets the underlying implementation of the Mock.
     * @param implementation function to execute.
     */
    executes<U>(implementation: (...args: B) => U): LooseMock<A, T | U>
    /**
     * Schedules the mock use the provided implementation the next time it's called.
     * If anything is already scheduled it will be used first.
     * @param implementation function to execute.
     */
    executesOnce<U>(implementation: (...args: B) => U): LooseMock<A, T | U>
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

export function looseMockFn(): LooseMock<any[], undefined> {
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

  mock.given = function (...args: any[]) {
    return {
      returns(value: any) {
        recurringOverrides.push({ args, spec: { type: 'return', value } })
        return mock
      },

      returnsOnce(value: any) {
        oneTimeOverrides.push({ args, spec: { type: 'return', value } })
        return mock
      },

      throws(error: any) {
        recurringOverrides.push({ args, spec: { type: 'throw', error } })
        return mock
      },

      throwsOnce(error: any) {
        oneTimeOverrides.push({ args, spec: { type: 'throw', error } })
        return mock
      },

      executes(implementation: (...args: any[]) => any) {
        recurringOverrides.push({
          args,
          spec: { type: 'exec', implementation },
        })
        return mock
      },

      executesOnce(implementation: (...args: any[]) => any) {
        oneTimeOverrides.push({ args, spec: { type: 'exec', implementation } })
        return mock
      },
    }
  }

  defaultExecutionCtx.registerMock(mock as any)
  return mock
}
