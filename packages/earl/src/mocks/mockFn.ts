import { isEqual } from '../isEqual/index.js'
import type {
  MockCall,
  MockFunction,
  MockFunctionOf,
  Spec,
} from './types/index.js'

interface Override {
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  args: any[]
  spec: Spec
}

const mockSymbol = Symbol('mock')

/**
 * Creates a mock function conforming to a given signature. You can call methods
 * on the mock function to further customize its behavior.
 *
 * Without a default implementation and without any further configuration the
 * mock will throw an error when called.
 *
 * @param defaultImplementation - (optional) A default implementation to use
 *   when the mock is called.
 *
 * @example
 * ```ts
 * const mock1 = mockFn((a: number, b: string) => a + b.length)
 *
 * const mock2 = mockFn<(a: number, b: string) => number>()
 * const mock3 = mockFn<[number, string], number>()
 *
 * const mock4 = mockFn().returnsOnce(420).returns(69)
 * ```
 */
// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function mockFn<F extends (...args: any) => any>(
  defaultImplementation?: F,
): MockFunctionOf<F>
// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function mockFn<A extends any[], R>(
  defaultImplementation?: (...args: A) => R,
): MockFunction<A, R>
// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function mockFn<A extends any[], R>(
  defaultImplementation?: (...args: A) => R,
): MockFunction<A, R> {
  let defaultSpec: Spec = {
    type: 'not-ready',
  }
  let oneTimeOverrides: Spec[] = []
  let parameterOverrides: Override[] = []

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  function mock(...args: any[]) {
    for (const override of parameterOverrides) {
      if (isEqual(args, override.args)) {
        parameterOverrides.splice(parameterOverrides.indexOf(override), 1)
        return runSpec(override.spec, args)
      }
    }
    const current = oneTimeOverrides.shift() ?? defaultSpec
    return runSpec(current, args)
  }

  mock[mockSymbol] = true
  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.calls = [] as MockCall<any, any>[]
  mock.isExhausted = () =>
    oneTimeOverrides.length === 0 && parameterOverrides.length === 0

  mock.getOneTimeOverridesLength = () => oneTimeOverrides.length

  mock.getParameterOverridesLength = () => parameterOverrides.length

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  function runSpec(spec: Spec, args: any[]) {
    switch (spec.type) {
      case 'return': {
        mock.calls.push({ args, result: { type: 'return', value: spec.value } })
        return spec.value
      }
      case 'lazy-return': {
        const value = spec.value()
        mock.calls.push({ args, result: { type: 'return', value } })
        return value
      }
      case 'throw': {
        mock.calls.push({ args, result: { type: 'throw', error: spec.error } })
        throw spec.error
      }
      case 'exec': {
        try {
          const value = spec.implementation(...args)
          mock.calls.push({ args, result: { type: 'return', value } })
          return value
        } catch (error) {
          mock.calls.push({ args, result: { type: 'throw', error } })
          throw error
        }
      }
      case 'not-ready': {
        if (parameterOverrides.length > 0) {
          throw new Error(
            'The mock function was called with arguments that do not match any of the parameter overrides and no default behavior has been provided.',
          )
        }
        throw new TypeError(
          'The mock function was called but no default behavior has been provided.',
        )
      }
      default: {
        throw new Error('Unreachable case')
      }
    }
  }

  mock.reset = () => {
    defaultSpec = { type: 'not-ready' }
    oneTimeOverrides = []
    parameterOverrides = []
    mock.clear()
    if (defaultImplementation) {
      mock.executes(defaultImplementation)
    }
  }

  mock.clear = () => {
    mock.calls = []
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.returns = (value: any) => {
    defaultSpec = { type: 'return', value }
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.returnsOnce = (value: any) => {
    oneTimeOverrides.push({ type: 'return', value })
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.throws = (error: any) => {
    defaultSpec = { type: 'throw', error }
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.throwsOnce = (error: any) => {
    oneTimeOverrides.push({ type: 'throw', error })
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.executes = (implementation: (...args: any[]) => any) => {
    defaultSpec = { type: 'exec', implementation }
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.executesOnce = (implementation: (...args: any[]) => any) => {
    oneTimeOverrides.push({ type: 'exec', implementation })
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.resolvesTo = (value: any) => {
    defaultSpec = { type: 'return', value: Promise.resolve(value) }
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.resolvesToOnce = (value: any) => {
    oneTimeOverrides.push({ type: 'return', value: Promise.resolve(value) })
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.rejectsWith = (error: any) => {
    defaultSpec = { type: 'lazy-return', value: () => Promise.reject(error) }
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.rejectsWithOnce = (error: any) => {
    oneTimeOverrides.push({
      type: 'lazy-return',
      value: () => Promise.reject(error),
    })
    return mock
  }

  // biome-ignore lint/suspicious/noExplicitAny: any is required here
  mock.given = (...args: any[]) => ({
    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    returnsOnce(value: any) {
      parameterOverrides.push({ args, spec: { type: 'return', value } })
      return mock
    },

    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    throwsOnce(error: any) {
      parameterOverrides.push({ args, spec: { type: 'throw', error } })
      return mock
    },

    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    executesOnce(implementation: (...args: any[]) => any) {
      parameterOverrides.push({
        args,
        spec: { type: 'exec', implementation },
      })
      return mock
    },

    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    resolvesToOnce(value: any) {
      parameterOverrides.push({
        args,
        spec: { type: 'return', value: Promise.resolve(value) },
      })
      return mock
    },

    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    rejectsWithOnce(error: any) {
      parameterOverrides.push({
        args,
        spec: { type: 'lazy-return', value: () => Promise.reject(error) },
      })
      return mock
    },
  })

  if (defaultImplementation) {
    mock.executes(defaultImplementation)
  }

  return mock
}

// biome-ignore lint/suspicious/noExplicitAny: any is required here
export function isMockFn(value: unknown): value is MockFunction<any[], any> {
  return typeof value === 'function' && mockSymbol in value
}
