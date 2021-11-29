import { UnreachableCaseError } from 'ts-essentials'

import { smartEq } from '../validators/smartEq'
import { MockNotConfiguredError } from './errors'
import { Mock, MockCall } from './types'

interface ReturnSpec {
  type: 'return'
  value: any
}

/**
 * Used to lazily evaluate rejected promises so node doesn't think they are unhandled
 */
interface LazyReturnSpec {
  type: 'lazy-return'
  value: () => any
}

interface ThrowSpec {
  type: 'throw'
  error: any
}

interface ExecSpec {
  type: 'exec'
  implementation: (...args: any[]) => any
}

interface NotReadySpec {
  type: 'not-ready'
}

type Spec = ReturnSpec | LazyReturnSpec | ThrowSpec | ExecSpec | NotReadySpec

interface Override {
  args: any[]
  spec: Spec
}

/**
 * Creates a mock conforming to a given signature.
 *
 * @example
 * ```ts
 * const mock1 = mockFn<[number, string], number>()
 * const mock2 = mockFn<(a: number, b: string) => number>()
 * ```
 */
export function mockFn<F extends (...args: any) => any>(defaultImpl?: F): Mock.Of<F>
export function mockFn<Args extends any[], Return = any>(defaultImpl?: (...args: Args) => Return): Mock<Args, Return>
export function mockFn<Args extends any[], Return = any>(defaultImpl?: (...args: Args) => Return): Mock<Args, Return> {
  let spec: Spec = {
    type: 'not-ready',
  }
  let queue: Spec[] = []
  let oneTimeOverrides: Override[] = []

  function mock(...args: any[]) {
    for (const override of oneTimeOverrides) {
      if (smartEq(args, override.args).result === 'success') {
        oneTimeOverrides.splice(oneTimeOverrides.indexOf(override), 1)
        return runSpec(override.spec, args)
      }
    }
    const current = queue.shift() || spec
    return runSpec(current, args)
  }

  mock.calls = [] as MockCall<any, any>[]
  mock.isExhausted = function () {
    return queue.length === 0 && oneTimeOverrides.length === 0
  }

  function runSpec(spec: Spec, args: any[]) {
    switch (spec.type) {
      case 'return':
        mock.calls.push({ args, result: { type: 'return', value: spec.value } })
        return spec.value
      case 'lazy-return':
        const value = spec.value()
        mock.calls.push({ args, result: { type: 'return', value } })
        return value
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
      case 'not-ready':
        throw new MockNotConfiguredError()
      default:
        throw new UnreachableCaseError(spec)
    }
  }

  function reset(newSpec: Spec) {
    spec = newSpec
    queue = []
    oneTimeOverrides = []
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

  mock.rejectsWith = function (error: any) {
    reset({ type: 'lazy-return', value: () => Promise.reject(error) })
    return mock
  }
  mock.rejectsWithOnce = function (error: any) {
    queue.push({ type: 'lazy-return', value: () => Promise.reject(error) })
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

      rejectsWithOnce(error: any) {
        oneTimeOverrides.push({ args, spec: { type: 'lazy-return', value: () => Promise.reject(error) } })
        return mock
      },
    }
  }

  if (defaultImpl) {
    mock.executes(defaultImpl)
  }

  return mock
}
