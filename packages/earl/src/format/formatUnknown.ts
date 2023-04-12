import { Matcher } from '../expect.js'
import { getCanonicalType } from '../isEqual/getCanonicalType.js'
import { formatArrayEntries } from './formatArrayEntries.js'
import { formatMapEntries } from './formatMapEntries.js'
import { formatNumber } from './formatNumber.js'
import { formatObjectEntries } from './formatObjectEntries.js'
import { FormatOptions } from './FormatOptions.js'
import { formatSetEntries } from './formatSetEntries.js'
import { formatString } from './formatString.js'
import { formatSymbol } from './formatSymbol.js'
import { getComparedTypeName } from './getComparedTypeName.js'
import { getRepresentation } from './getRepresentation.js'
import { toLine } from './toLine.js'

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
      return toLine('null')
    case 'undefined':
      return toLine('undefined')
    case 'boolean':
      return toLine(value ? 'true' : 'false')
    case 'string':
      return toLine(formatString(value as string, options))
    case 'bigint':
      return toLine(`${value as bigint}n`)
    case 'number':
      return formatNumber(value as number, sibling, options)
    case 'symbol':
      return formatSymbol(value as symbol, sibling)
  }

  if (value instanceof Matcher) {
    if (!options.skipMatcherReplacement && value.check(sibling)) {
      return formatUnknown(sibling, null, options, siblingStack, [])
    } else {
      let line = `expect.${value.toString()}`
      if (options.inline && line.length > options.maxLineLength) {
        // TODO: function name!
        line = 'expect.?'
      }
      return toLine(line)
    }
  }

  const selfIndex = valueStack.indexOf(value)
  if (selfIndex !== -1) {
    const dots = '.'.repeat(valueStack.length - selfIndex)
    return toLine(`<Circular ${dots}>`)
  }

  const items: string[] = []

  const { typeName, isDifferentPrototype, isSameTypeName } =
    getComparedTypeName(value, sibling, type, options.ignorePrototypes)
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

  if (
    type === 'Error' &&
    options.inline &&
    options.maxLineLength !== Infinity
  ) {
    return toLine(
      `${typeName ?? ''}(${formatString((value as Error).message, options)})`,
    )
  }

  const representation = getRepresentation(value, type, options)
  if (representation) {
    items.push(representation)
  }

  const entries: [number, string][] = []

  valueStack.push(value)
  siblingStack.push(sibling)

  if (type === 'Array') {
    entries.push(
      ...formatArrayEntries(
        value as unknown[],
        sibling,
        options,
        valueStack,
        siblingStack,
      ),
    )
  } else if (type === 'Set') {
    entries.push(
      ...formatSetEntries(
        value as Set<unknown>,
        sibling,
        options,
        valueStack,
        siblingStack,
      ),
    )
  } else if (type === 'Map') {
    entries.push(
      ...formatMapEntries(
        value as Map<unknown, unknown>,
        sibling,
        options,
        valueStack,
        siblingStack,
      ),
    )
  }
  entries.push(
    ...formatObjectEntries(
      value as object,
      sibling,
      options,
      valueStack,
      siblingStack,
    ),
  )

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
    let jointEntries = entries.map((x) => x[1]).join(', ')
    if (jointEntries.length > options.maxLineLength) {
      jointEntries =
        entries.length === 1 ? '1 entry' : `${entries.length} entries`
    }
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
