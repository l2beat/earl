import { defaultExecutionCtx } from '../ExecutionCtx'
import { smartEq } from '../validators/toEqual'

type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never

export interface StrictMock<ARGS extends any[], RETURN> {
  /** Calls the mock function */
  (...args: ARGS): RETURN
  isExhausted(): boolean

  /**
   * Specifies a different behavior when other arguments are given
   * @param args arguments to match
   */
  expectedCall(
    args: ARGS,
  ): {
    /**
     * Sets the return value of calls to the Mock.
     * @param value value to be returned.
     */
    returns(value: RETURN): StrictMock<ARGS, RETURN>

    /**
     * Sets the return value wrapped in Promise.resolve of calls to the Mock.
     * @param value value to be returned.
     */
    resolvesTo(value: Awaited<RETURN>): StrictMock<ARGS, RETURN>

    /**
     * Sets the error thrown by calls to the Mock.
     * @param error error to be thrown.
     */
    throws(error: any): StrictMock<ARGS, RETURN>

    /**
     * Sets the error rejected by calls to the Mock.
     * @param error error to be thrown.
     */
    rejectsWith(error: any): StrictMock<ARGS, RETURN>

    /**
     * Sets the underlying implementation of the Mock.
     * @param implementation function to execute.
     */
    executes(implementation: (...args: ARGS) => RETURN): StrictMock<ARGS, RETURN>
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

export function strictMockFn<FN extends (...args: any) => any = (...args: never) => never>(): Parameters<
  FN
> extends never
  ? never
  : StrictMock<Parameters<FN>, ReturnType<FN>>
export function strictMockFn<ARGS extends any[] = never, RETURN = never>(): ARGS extends never
  ? never
  : StrictMock<ARGS, RETURN>
export function strictMockFn<ARGS extends any[] = never, RETURN = never>(): ARGS extends never
  ? never
  : StrictMock<ARGS, RETURN> {
  const queue: Spec[] = []

  function mock(...args: any[]) {
    const currentSpec = queue[0]

    if (!currentSpec) {
      throw new Error(`Unexpected call! Called with ${JSON.stringify(args)}`)
    }
    verifyArgs(args, currentSpec.args)
    queue.shift()

    return runSpec(currentSpec, args)
  }

  mock.isExhausted = function () {
    return queue.length === 0
  }

  function runSpec(spec: Spec, args: any[]) {
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

  mock.expectedCall = function (args: any[]) {
    return {
      returns(value: any) {
        queue.push({ args, type: 'return', value })
        return mock
      },

      resolvesTo(value: any) {
        queue.push({ args, type: 'return', value: Promise.resolve(value) })
        return mock
      },

      throws(error: any) {
        queue.push({ args, type: 'throw', error })
        return mock
      },

      rejectsWith(error: any) {
        // @todo this results in an ugly warning about unhandled rejected promise...
        queue.push({ args, type: 'return', value: Promise.reject(error) })
        return mock
      },

      executes(implementation: (...args: any[]) => any) {
        queue.push({ args, type: 'exec', implementation })
        return mock
      },
    }
  }

  defaultExecutionCtx.registerMock(mock as any)
  // @todo get rid of this any
  return mock as any
}
