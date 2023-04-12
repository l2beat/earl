import { registerMatcher } from '../../expect.js'
import { isEqual } from '../../isEqual/index.js'

declare module '../../expect.js' {
  interface Matchers {
    /**
     * Matches an array, Set or iterable that includes the given item or items.
     * Also matches a string that includes the given substring or substrings.
     *
     * If you want to match a top level value, use
     * `expect(...).toInclude(...items)` instead.
     *
     * @param items - Items or matchers to look for. When the value is a string,
     *   all items must be strings too.
     *
     * @example
     * ```ts
     * expect({
     *   numbers: [1, 2, 3],
     *   mixed: [1, 'foo', false],
     *   string: 'I like pancakes',
     * }).toEqual({
     *   numbers: expect.includes(1, 2),
     *   mixed: expect.includes(1, expect.a(String)),
     *   string: expect.includes('pancakes'),
     * })
     * ```
     */
    includes(...items: any[]): never
  }
}

registerMatcher('includes', includes)

export function includes(...items: any[]) {
  return (value: unknown) => {
    if (typeof value === 'string') {
      if (items.some((item) => typeof item !== 'string')) {
        return false
      }
      return items.every((item) => value.includes(item))
    }
    if (!isIterable(value)) {
      return false
    }
    return contains(Array.from(value), items)
  }
}

function isIterable(value: unknown): value is Iterable<any> {
  return Symbol.iterator in Object(value)
}

function contains(array: readonly any[], items: readonly any[]): boolean {
  const matchedIndexes: Record<number, boolean> = {}
  return items.every((expectedItem) => {
    const foundIndex = array.findIndex(
      (actualItem, index) =>
        isEqual(actualItem, expectedItem) && !matchedIndexes[index],
    )
    if (foundIndex !== -1) {
      matchedIndexes[foundIndex] = true
      return true
    } else {
      return false
    }
  })
}
