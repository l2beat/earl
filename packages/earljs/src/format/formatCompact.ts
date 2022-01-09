import { CanonicalType, getCanonicalType, getKeys } from '../isEqual'
import { Matcher } from '../matchers'
import { format } from './format'
import { FormatOptions } from './FormatOptions'
import { getFunctionTypeName, getTypeName } from './getComparedTypeName'

const FORMAT_OPTIONS: FormatOptions = {
  compareErrorStack: false,
  ignorePrototypes: false,
  minusZero: false,
  uniqueNaNs: false,
  indentSize: 0,
  inline: true,
  skipMatcherReplacement: true,
  requireStrictEquality: false,
}

export function formatCompact(value: unknown): string {
  const full = format(value, null, FORMAT_OPTIONS)
  if (full.length < 30 || value instanceof Matcher) {
    return full
  }

  if (typeof value === 'string') {
    if (value.length > 20) {
      return JSON.stringify(value.slice(0, 7) + '...')
    } else {
      return JSON.stringify(value)
    }
  } else if (typeof value === 'bigint') {
    return value.toString() + 'n'
  } else if (typeof value === 'symbol') {
    return format(value, null, FORMAT_OPTIONS)
  } else if (typeof value === 'function') {
    return getFunctionTypeName(value as Function)
  } else if (typeof value === 'object' && value !== null) {
    const type = getCanonicalType(value)
    const typeName = getTypeName(value, false) ?? ''
    switch (type) {
      case 'Array':
        return formatCompactArray(value as unknown[], typeName)
      case 'String':
      case 'Number':
      case 'Boolean':
        return `${typeName} ${formatCompact(value.valueOf())}`
      case 'Date':
        return `${typeName} ${(value as Date).toISOString()}`
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
        return typeName
      case 'RegExp':
        return formatCompactRegExp(value as RegExp, typeName)
      case 'Error':
        return `${typeName}(${formatCompact((value as Error).message)})`
    }
    return formatCompactObject(value, typeName, type)
  }
  return `${value}`
}

function formatCompactObject(value: object, typeName: string, type: CanonicalType): string {
  const keys = getKeys(value, type, FORMAT_OPTIONS)
  let base = '{}'
  if (keys.length > 0 && keys.length <= 2) {
    base = `{ ${keys.map(formatCompactKey).join(', ')} }`
  } else if (keys.length > 2) {
    base = `{ ${keys.length} properties }`
  }
  return typeName !== 'Object' ? `${typeName} ${base}` : base
}

function formatCompactKey(key: string) {
  if (key.length > 10) {
    return JSON.stringify(key.slice(0, 7) + '...')
  }
  return /^\w+$/.test(key) ? key : JSON.stringify(key)
}

function formatCompactRegExp(value: RegExp, typeName: string): string {
  const base = value.toString()
  return typeName !== 'RegExp' ? `${typeName} ${base}` : base
}

function formatCompactArray(value: unknown[], typeName: string): string {
  const base = value.length > 0 ? `[ length: ${value.length} ]` : '[]'
  return typeName !== 'Array' ? `${typeName} ${base}` : base
}
