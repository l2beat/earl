import { Matcher } from '../matchers/Base'

type ErrorReasons = 'value mismatch' | 'prototype mismatch'
export type SmartEqResult = { result: 'success' } | { result: 'error'; reason: ErrorReasons }

function buildSmartEqResult(success: boolean, reason: ErrorReasons = 'value mismatch'): SmartEqResult {
  if (success) {
    return { result: 'success' }
  } else {
    return { result: 'error', reason }
  }
}

function isIterableAndNotString(value: any): value is IterableIterator<any> {
  return Symbol.iterator in Object(value) && typeof value !== 'string'
}

// strict skips prototype check
export function smartEq(actual: any, expected: any, strict: boolean = true): SmartEqResult {
  if (expected instanceof Matcher) {
    return buildSmartEqResult(expected.check(actual))
  }

  if (actual instanceof Date) {
    if (expected instanceof Date) {
      return buildSmartEqResult(actual.getTime() === expected.getTime())
    } else {
      return buildSmartEqResult(false, 'prototype mismatch')
    }
  }

  if (typeof actual === 'symbol') {
    if (typeof expected === 'symbol') {
      return smartEq(actual.toString(), expected.toString())
    } else {
      return buildSmartEqResult(false, 'prototype mismatch')
    }
  }

  if (isIterableAndNotString(actual)) {
    if (isIterableAndNotString(expected)) {
      const actualArray = Array.from(actual)
      const expectedArray = Array.from(expected)

      const equality = actualArray.map((v, i) => smartEq(v, expectedArray?.[i]))
      return buildSmartEqResult(!equality.some((eq) => eq.result === 'error'))
    } else {
      return buildSmartEqResult(false, 'prototype mismatch')
    }
  }

  if (actual && actual instanceof Object) {
    if (!expected) {
      return buildSmartEqResult(false, 'prototype mismatch')
    }

    if (strict && Object.getPrototypeOf(actual) !== Object.getPrototypeOf(expected)) {
      return buildSmartEqResult(false, 'prototype mismatch')
    }

    if (typeof expected === 'object') {
      const allKeys = Object.keys(actual).concat(Object.keys(expected))
      const equality = allKeys.map((k) => {
        if (!(k in expected && k in actual)) {
          return buildSmartEqResult(false)
        }

        return smartEq(actual[k], expected[k])
      })

      return buildSmartEqResult(!equality.some((eq) => eq.result === 'error'))
    }
  }

  return buildSmartEqResult(Object.is(actual, expected), 'value mismatch')
}
