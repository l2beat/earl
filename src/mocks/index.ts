import { smartEq } from '../validators/smartEq'
import { Mock, MockCall } from './types'

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

export function mockFn<FUNCTION_SIG extends (...args: any) => any>(
  defaultImpl?: FUNCTION_SIG,
): Mock<Parameters<FUNCTION_SIG>, ReturnType<FUNCTION_SIG>>
export function mockFn<ARGS extends any[], RETURN = any>(defaultImpl?: (...args: ARGS[]) => RETURN): Mock<ARGS, RETURN>
export function mockFn<ARGS extends any[], RETURN = any>(
  defaultImpl?: (...args: ARGS[]) => RETURN,
): Mock<ARGS, RETURN> {
  let spec: Spec = {
    type: 'return',
    value: undefined,
  }
  let queue: Spec[] = []
  let oneTimeOverrides: Override[] = []
  let recurringOverrides: Override[] = []

  function mock(...args: any[]) {
    for (const override of oneTimeOverrides) {
      if (smartEq(args, override.args).result === 'success') {
        oneTimeOverrides.splice(oneTimeOverrides.indexOf(override), 1)
        return runSpec(override.spec, args)
      }
    }
    for (const override of recurringOverrides) {
      if (smartEq(args, override.args).result === 'success') {
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
