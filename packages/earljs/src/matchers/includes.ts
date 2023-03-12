import { registerMatcher } from '../expect'
import { isEqual } from '../isEqual'

declare module '../expect' {
  interface Matchers {
    /**
     * Matches an array, Set or iterable that includes the given item or items.
     *
     * @example
     * ```ts
     * // matches [1], [1, 2] and new Set([1, 2])
     * expect.includes(1)
     * // matches ["foo", "bar"], but not ["foo"]
     * expect.includes("foo", "bar")
     * // matches [1, "foo"], but not ["foo", "bar"]
     * expect.includes(expect.a(Number))
     * ```
     *
     * @param items - items or matchers to look for.
     */
    includes(...items: any[]): any
    // we can't use any[] & Set<any> & Iterable<any> because of missing keys
  }
}

registerMatcher('includes', includes)

export function includes(...items: any[]) {
  return (value: unknown) => {
    if (!isIterableAndNotString(value)) {
      return false
    }
    return contains(Array.from(value), items)
  }
}

function isIterableAndNotString(value: unknown): value is Iterable<any> {
  return Symbol.iterator in Object(value) && typeof value !== 'string'
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
