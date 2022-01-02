import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'

export function formatFunction(
  value: Function,
  sibling: unknown,
  options: FormatOptions,
  stack: unknown[],
): [number, string][] {
  const signature = formatFunctionSignature(value, sibling, options)
  return formatWithObject('Object', signature, value, sibling, options, stack)
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
    formatFunctionSignature(sibling, undefined, options) === formatted
  ) {
    formatted += ' (different)'
  }
  return formatted
}
