import { Matcher } from '../matchers'
import { EqualityOptions } from './EqualityOptions'
import { isEqualNumber } from './isEqualNumber'
import { isEqualObject } from './isEqualObject'
import { smartEqRules } from './rules'

export function isEqualUnknown(
  value: unknown,
  valueStack: unknown[],
  other: unknown,
  otherStack: unknown[],
  options: EqualityOptions,
) {
  if (other instanceof Matcher) {
    return other.check(value)
  }

  for (const rule of smartEqRules) {
    const ruleResult = rule(value, other, options.ignorePrototypes)
    if (ruleResult) {
      return ruleResult.result === 'success'
    }
  }

  if (typeof value !== typeof other) {
    return false
  } else if (typeof value === 'number') {
    return isEqualNumber(value, other as number, options)
  } else if (typeof value === 'object' && value !== null) {
    return isEqualObject(value, valueStack, other as object, otherStack, options)
  }
  return value === other
}
