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
  hint?: string
  reason: string
  negatedReason: string
  actual?: any
  expected?: any
}

export function formatValue(value: any) {
  return prettyFormat(value, { min: true })
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

export function isIterableAndNotString(value: any): value is IterableIterator<any> {
  return Symbol.iterator in Object(value) && typeof value !== 'string'
}
