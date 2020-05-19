import { smartEq } from '../validators/toEqual'

export interface StrictMock<A extends any[], T> {
  /** Calls the mock function */
  (...args: A): T
  isExhausted(): boolean

  /**
   * Specifies a different behavior when other arguments are given
   * @param args arguments to match
   */
  expectedCall<B extends A>(
    ...args: B
  ): {
    /**
     * Sets the return value of calls to the Mock.
     * @param value value to be returned.
     */
    returns<U>(value: U): StrictMock<A, T | U>

    /**
     * Sets the error thrown by calls to the Mock.
     * @param error error to be thrown.
     */
    throws(error: any): StrictMock<A, T>

    /**
     * Sets the underlying implementation of the Mock.
     * @param implementation function to execute.
     */
    executes<U>(implementation: (...args: B) => U): StrictMock<A, T | U>
  }
}

interface ReturnSpec {
  type: 'return'
  args: any[]
  value: any
}

interface ThrowSpec {
  type: 'throw'
  args: any[]
  error: any
}

interface ExecSpec {
  type: 'exec'
  args: any[]
  implementation: (...args: any[]) => any
}

type Spec = ReturnSpec | ThrowSpec | ExecSpec

export function strictMockFn<ARGS extends any[], RETURN>(): StrictMock<ARGS, RETURN> {
  const queue: Spec[] = []

  function mock(...args: any[]) {
    const current = queue.shift()
    return runSpec(current, args)
  }

  mock.isExhausted = function () {
    return queue.length === 0
  }

  function runSpec(spec: Spec | undefined, args: any[]) {
    if (!spec) {
      throw new Error('Unexpected call!')
    }

    verifyArgs(args, spec.args)

    switch (spec.type) {
      case 'return':
        return spec.value
      case 'throw':
        throw spec.error
      case 'exec':
        return spec.implementation(...args)
    }
  }

  function verifyArgs(actual: any[], expected: any[]) {
    if (!smartEq(actual, expected)) {
      throw new Error(
        `Unexpected call! Expected ${JSON.stringify(expected)} but was called with ${JSON.stringify(actual)}`,
      )
    }
  }

  mock.expectedCall = function (...args: any[]) {
    return {
      returns(value: any) {
        queue.push({ args, type: 'return', value })
        return mock
      },

      throws(error: any) {
        queue.push({ args, type: 'throw', error })
        return mock
      },

      executes(implementation: (...args: any[]) => any) {
        queue.push({ args, type: 'exec', implementation })
        return mock
      },
    }
  }

  return mock
}
