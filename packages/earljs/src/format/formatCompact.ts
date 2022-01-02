import { getKeys, getType, ObjectType } from '../isEqual/objectUtils'
import { Matcher } from '../matchers'
import { format } from './format'
import { formatFunctionSignature } from './formatFunction'
import { FormatOptions } from './FormatOptions'
import { getTypeName } from './getTypeName'

const FORMAT_OPTIONS: FormatOptions = {
  compareErrorStack: false,
  ignorePrototypes: false,
  indentSize: 0,
  inline: true,
  minusZero: false,
  uniqueNaNs: false,
}

export function formatCompact(value: unknown): string {
  if (typeof value === 'string') {
    if (value.length > 10) {
      return JSON.stringify(value.slice(0, 7) + '...')
    } else {
      return JSON.stringify(value)
    }
  } else if (typeof value === 'bigint') {
    return value.toString() + 'n'
  } else if (typeof value === 'symbol') {
    return format(value, null, FORMAT_OPTIONS)
  } else if (typeof value === 'function') {
    return formatFunctionSignature(value, null, FORMAT_OPTIONS)
  } else if (typeof value === 'object' && value !== null) {
    if (value instanceof Matcher) {
      return `Matcher ${value.toString()}`
    }
    const type = getType(value)
    const typeName = getTypeName(value, null)
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
    }
    return formatCompactObject(value, typeName, type)
  }
  return `${value}`
}

function formatCompactObject(value: object, typeName: string, type: ObjectType): string {
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
