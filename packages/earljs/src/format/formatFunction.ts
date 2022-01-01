import { FormatOptions } from './FormatOptions'

export function formatFunction(value: Function, sibling: unknown, options: FormatOptions): string {
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
      : formatFunction(sibling, undefined, options) === formatted)
  ) {
    formatted += ' (different)'
  }
  return formatted
}
