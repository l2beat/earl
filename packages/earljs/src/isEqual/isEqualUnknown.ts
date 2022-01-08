import { Matcher } from '../matchers'
import { EqualityOptions } from './EqualityOptions'
import { CanonicalType, getCanonicalType } from './getCanonicalType'
import { isEqualNumber } from './isEqualNumber'
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

  const type = getCanonicalType(value)
  const otherType = getCanonicalType(other)

  if (type !== otherType) {
    return false
  }

  switch (type) {
    case 'null':
    case 'undefined':
    case 'boolean':
    case 'bigint':
    case 'string':
    case 'symbol':
    case 'Function':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
      return value === other
    case 'number':
      return isEqualNumber(value as number, other as number, options)
  }

  // This check is so late because of isEqualNumber
  if (value === other) {
    return true
  }

  const valueIndex = valueStack.indexOf(value)
  const otherIndex = otherStack.indexOf(other)
  if (valueIndex !== -1 || otherIndex !== -1) {
    return valueIndex === otherIndex
  }

  if (!options.ignorePrototypes) {
    if (Object.getPrototypeOf(value) !== Object.getPrototypeOf(other)) {
      return false
    }
  }

  if (type === 'Array') {
    if ((value as unknown[]).length !== (other as unknown[]).length) {
      return false
    }
  } else if (type === 'Date' || type === 'String' || type === 'Number' || type === 'Boolean') {
    if ((value as object).valueOf() !== (other as object).valueOf()) {
      return false
    }
  } else if (type === 'RegExp') {
    if ((value as RegExp).toString() !== (other as RegExp).toString()) {
      return false
    }
  }

  return isEqualObject(value as object, valueStack, other as object, otherStack, options, type)
}

function isEqualObject(
  value: object,
  valueStack: unknown[],
  other: object,
  otherStack: unknown[],
  options: EqualityOptions,
  type: CanonicalType,
) {
  const keys = getKeys(value, type, options)
  const otherKeys = getKeys(other, type, options)
  if (keys.length !== otherKeys.length) {
    return false
  }
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== otherKeys[i]) {
      return false
    }
  }
  valueStack.push(value)
  otherStack.push(other)
  let result = true
  for (let i = 0; i < keys.length; i++) {
    if (!isEqualUnknown((value as any)[keys[i]], valueStack, (other as any)[otherKeys[i]], otherStack, options)) {
      result = false
      break
    }
  }
  valueStack.pop()
  otherStack.pop()
  return result
}

export function getKeys(value: object, type: CanonicalType, options: EqualityOptions) {
  let keys = Object.keys(value)
  if (type === 'Error') {
    addKey(keys, value, 'name')
    addKey(keys, value, 'message')
    addKey(keys, value, 'code')
    if (options.compareErrorStack) {
      addKey(keys, value, 'stack')
    } else {
      keys = keys.filter((key) => key !== 'stack')
    }
  } else if (type === 'String') {
    keys = keys.filter((key) => !/^\d+$/.test(key))
  }
  return keys.sort()
}

function addKey(keys: string[], value: object, key: string) {
  if (key in value) {
    keys.push(key)
  }
}
