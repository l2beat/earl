import { formatObject } from './formatObject'
import { FormatOptions } from './FormatOptions'

export function formatFunction(value: Function, sibling: unknown, options: FormatOptions): [number, string][] {
  const signature = formatFunctionSignature(value, sibling, options)
  const object = formatObject(value, sibling, options)
  if (object[0][1] === '{}') {
    return [[0, signature]]
  } else {
    object[0][1] = `${signature} & ${object[0][1]}`
    return object
  }
}

export function formatFunctionSignature(value: Function, sibling: unknown, options: FormatOptions): string {
  const name = value.name
  const isClass = value.toString().startsWith('class')
  const isNative = value.toString().endsWith('{ [native code] }')
  const typeName = isClass ? 'class' : 'function'
  let formatted = name ? `${typeName} ${name}${isClass ? '' : '()'}` : `anonymous ${typeName}`
  if (isNative) {
    formatted += ' (native)'
  }
  if (
    typeof sibling === 'function' &&
    value !== sibling &&
    (options.looseFunctionCompare
      ? value.toString() !== sibling.toString()
      : formatFunctionSignature(sibling, undefined, options) === formatted)
  ) {
    formatted += ' (different)'
  }
  return formatted
}
