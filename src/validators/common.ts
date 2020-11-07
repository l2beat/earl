
import { mapValues } from 'lodash'
import prettyFormat from 'pretty-format'

import { Matcher } from '../matchers/Base'

export interface Control<T> {
  actual: T
  isNegated: boolean
  assert: (result: ValidationResult) => void
}

export interface ValidationResult {
  success: boolean
  reason: string
  negatedReason: string
  actual?: any
  expected?: any
}

export function formatValue(value: any) {
  return prettyFormat(value, { min: true })
}

export type SmartEqResult = { result: 'success' } | { result: 'error'; reason: 'value mismatch' | 'prototype mismatch' }

/// @todo refactor reasons
// @todo actual = object, expect = undefined
function buildSmartEqResult(
  success: boolean,
  reason: 'value mismatch' | 'prototype mismatch' = 'value mismatch',
): SmartEqResult {
  if (success) {
    return { result: 'success' }
  } else {
    return { result: 'error', reason }
  }
}

function isIterable(value: any): boolean {
  return Symbol.iterator in Object(value)
}

export function smartEq(actual: any, expected: any): SmartEqResult {
  if (expected instanceof Matcher) {
    return buildSmartEqResult(expected.check(actual))
  }

  if (actual && actual instanceof Object) {
    if (!expected) {
      return buildSmartEqResult(false, 'prototype mismatch')
    }

    if (Object.getPrototypeOf(actual) !== Object.getPrototypeOf(expected)) {
      return buildSmartEqResult(false, 'prototype mismatch')
    }

    if (actual instanceof Date) {
      if (expected instanceof Date) {
        return buildSmartEqResult(actual.getTime() === expected.getTime())
      } else {
        return buildSmartEqResult(false, 'prototype mismatch')
      }
    }

    if (actual instanceof Set) {
      if (expected instanceof Set) {
        return smartEq(actual.entries(), expected.entries())
      } else {
        return buildSmartEqResult(false, 'prototype mismatch')
      }
    }

    if (isIterable(actual)) {
      if (isIterable(expected)) {
        const actualArray = Array.from(actual)
        const expectedArray = Array.from(expected)
        const equality = actualArray.map((v, i) => smartEq(v, expectedArray?.[i]))
        if (equality.some((eq) => eq.result === 'error')) {
          return buildSmartEqResult(false)
        } else {
          return buildSmartEqResult(true)
        }
      } else {
        return buildSmartEqResult(false, 'prototype mismatch')
      }
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

  if (typeof actual === 'symbol') {
    if (typeof expected === 'symbol') {
      return smartEq(actual.toString(), expected.toString())
    } else {
      return buildSmartEqResult(false, 'prototype mismatch')
    }
  }

  return buildSmartEqResult(Object.is(actual, expected), 'value mismatch')
}

export function replaceMatchersWithMatchedValues(actual: any, expected: any): any {
  if (expected instanceof Matcher) {
    if (expected.check(actual)) {
      return actual
    } else {
      return expected.toString()
    }
  }

  if (expected === null) {
    return null
  }

  if (Array.isArray(expected)) {
    return expected.map((v, i) => replaceMatchersWithMatchedValues(actual?.[i], v))
  }

  if (typeof expected === 'object') {
    return mapValues(expected, (v, k) => replaceMatchersWithMatchedValues(actual?.[k], v))
  }

  return expected
}
