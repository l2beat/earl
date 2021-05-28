import { Matcher } from '../matchers/Base'
import { SmartEqRule } from '../plugins/types'
import { isIterableAndNotString } from './common'

type ErrorReasons = 'value mismatch' | 'prototype mismatch'
export type SmartEqResult = { result: 'success' } | { result: 'error'; reason: ErrorReasons }

export function buildSmartEqResult(success: boolean, reason: ErrorReasons = 'value mismatch'): SmartEqResult {
  if (success) {
    return { result: 'success' }
  } else {
    return { result: 'error', reason }
  }
}

// strict=false skips prototype check
export function smartEq(actual: any, expected: any, strict: boolean = true, seen: Set<any> = new Set()): SmartEqResult {
  // handles recursive objects
  if (seen.has(actual) && seen.has(expected)) {
    return buildSmartEqResult(true)
  }
  seen.add(actual)
  seen.add(expected)

  if (expected instanceof Matcher) {
    return buildSmartEqResult(expected.check(actual))
  }

  for (const rule of dynamicRules) {
    const ruleResult = rule(actual, expected, strict)

    if (ruleResult) {
      return ruleResult
    }
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
      return smartEq(actual.toString(), expected.toString(), strict, seen)
    } else {
      return buildSmartEqResult(false, 'prototype mismatch')
    }
  }

  if (isIterableAndNotString(actual)) {
    if (isIterableAndNotString(expected)) {
      const actualArray = Array.from(actual)
      const expectedArray = Array.from(expected)

      if (actualArray.length !== expectedArray.length) {
        return buildSmartEqResult(false)
      }

      const equality = actualArray.map((v, i) => smartEq(v, expectedArray[i], strict, seen))
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

        return smartEq(actual[k], expected[k], strict, seen)
      })

      return buildSmartEqResult(!equality.some((eq) => eq.result === 'error'))
    }
  }

  return buildSmartEqResult(Object.is(actual, expected), 'value mismatch')
}

// dynamicRules are used by plugin system
const dynamicRules: SmartEqRule[] = []
export function loadSmartEqRules(rules: ReadonlyArray<SmartEqRule>): void {
  dynamicRules.push(...rules)
}
