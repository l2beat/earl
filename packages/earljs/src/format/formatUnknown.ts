import { getCanonicalType } from '../isEqual'
import { Matcher } from '../matchers'
import { formatArrayEntries } from './formatArrayEntries'
import { formatNumber } from './formatNumber'
import { formatObjectEntries } from './formatObjectEntries'
import { FormatOptions } from './FormatOptions'
import { formatSymbol } from './formatSymbol'
import { getComparedTypeName } from './getComparedTypeName'
import { getRepresentation } from './getRepresentation'
import { toLine } from './toLine'

export function formatUnknown(
  value: unknown,
  sibling: unknown,
  options: FormatOptions,
  valueStack: unknown[],
  siblingStack: unknown[],
): [number, string][] {
  const type = getCanonicalType(value)

  switch (type) {
    case 'null':
    case 'undefined':
    case 'boolean':
      return toLine(`${value}`)
    case 'string':
      return toLine(JSON.stringify(value))
    case 'bigint':
      return toLine(`${value}n`)
    case 'number':
      return formatNumber(value as number, sibling, options)
    case 'symbol':
      return formatSymbol(value as symbol, sibling)
  }

  if (value instanceof Matcher) {
    if (!options.skipMatcherReplacement && value.check(sibling)) {
      return formatUnknown(sibling, null, options, siblingStack, [])
    } else {
      return toLine(`Matcher ${value.toString()}`)
    }
  }

  const selfIndex = valueStack.indexOf(value)
  if (selfIndex !== -1) {
    const dots = '.'.repeat(valueStack.length - selfIndex)
    return toLine(`<Circular ${dots}>`)
  }

  const items: string[] = []

  const { typeName, isDifferentPrototype, isSameTypeName } = getComparedTypeName(
    value,
    sibling,
    type,
    options.ignorePrototypes,
  )
  if (typeName) {
    items.push(typeName)
  }
  if (isDifferentPrototype) {
    items.push('(different prototype)')
  }

  if (
    options.requireStrictEquality ||
    type === 'Promise' ||
    type === 'WeakMap' ||
    type === 'WeakSet' ||
    type === 'Function'
  ) {
    if (value !== sibling && isSameTypeName && !isDifferentPrototype) {
      items.push('(different)')
    }
  }

  if (type === 'Promise' || type === 'WeakMap' || type === 'WeakSet') {
    return toLine(items.join(' '))
  }

  const representation = getRepresentation(value, type)
  if (representation) {
    items.push(representation)
  }

  const entries: [number, string][] = []

  valueStack.push(value)
  siblingStack.push(sibling)

  if (type === 'Array') {
    entries.push(...formatArrayEntries(value as unknown[], sibling, options, valueStack, siblingStack))
  }
  entries.push(...formatObjectEntries(value as object, sibling, options, valueStack, siblingStack))

  valueStack.pop()
  siblingStack.pop()

  const skipObjectIfEmpty =
    type === 'Date' ||
    type === 'Function' ||
    type === 'RegExp' ||
    type === 'String' ||
    type === 'Number' ||
    type === 'Boolean'

  if (entries.length === 0) {
    if (!skipObjectIfEmpty) {
      items.push(type === 'Array' ? '[]' : '{}')
    }
    return toLine(items.join(' '))
  }

  if (skipObjectIfEmpty) {
    items.push('&')
  }

  items.push(type === 'Array' ? '[' : '{')

  const beginning = items.join(' ')

  if (options.inline) {
    const jointEntries = entries.map((x) => x[1]).join(', ')
    if (type === 'Array') {
      return toLine(`${beginning}${jointEntries}]`)
    } else {
      return toLine(`${beginning} ${jointEntries} }`)
    }
  } else {
    entries.unshift([0, beginning])
    entries.push([0, type === 'Array' ? ']' : '}'])
    return entries
  }
}
