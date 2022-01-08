import { FormatOptions } from './FormatOptions'
import { formatWithObject } from './formatWithObject'

export function formatFunction(
  value: Function,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
): [number, string][] {
  const signature = formatFunctionSignature(value, sibling, options)
  return formatWithObject('Function', signature, value, sibling, options, valueStack, siblingStack)
}

export function formatFunctionSignature(value: Function, sibling: unknown, options: FormatOptions): string {
  const name = value.name || '[anonymous]'
  const isNative = value.toString().endsWith('{ [native code] }')
  const typeName = getFunctionTypeName(value)
  let formatted = `${typeName} ${name}${typeName === 'class' ? '' : '()'}`
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

function getFunctionTypeName(value: Function) {
  if (value.toString().startsWith('class')) {
    return 'class'
  }
  switch (value.constructor.name) {
    case 'GeneratorFunction':
      return 'function*'
    case 'AsyncGeneratorFunction':
      return 'async function*'
    case 'AsyncFunction':
      return 'async function'
  }
  return 'function'
}
