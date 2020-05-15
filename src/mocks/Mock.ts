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
}

export function mockFn (): Mock<any[], undefined> {
  let spec: Spec = {
    type: 'return',
    value: undefined
  }
  let queue: Spec[] = []

  function mock (...args: any[]) {
    const current = queue.shift() || spec
    switch (current.type) {
      case 'return': return current.value
      case 'throw': throw current.error
      case 'exec': return current.implementation(...args)
    }
  }

  mock.returns = function (value: any) {
    spec = { type: 'return', value }
    queue = []
    return mock
  }

  mock.returnsOnce = function (value: any) {
    queue.push({ type: 'return', value })
    return mock
  }

  mock.throws = function (error: any) {
    spec = { type: 'throw', error }
    queue = []
    return mock
  }

  mock.throwsOnce = function (error: any) {
    queue.push({ type: 'throw', error })
    return mock
  }

  mock.executes = function (implementation: (...args: any[]) => any) {
    spec = { type: 'exec', implementation }
    queue = []
    return mock
  }

  mock.executesOnce = function (implementation: (...args: any[]) => any) {
    queue.push({ type: 'exec', implementation })
    return mock
  }

  return mock
}
