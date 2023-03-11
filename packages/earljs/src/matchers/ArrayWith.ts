import { Dictionary } from 'ts-essentials'

import { formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { Matcher } from './Base'

export class ArrayWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: readonly T[]) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return contains(this.expectedItems, actualItems)
  }

  toString() {
    return `[ArrayWith: ${formatCompact(this.expectedItems)}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}

/** @internal */
export function contains(expectedItems: readonly any[], actualItems: readonly any[]): boolean {
  const matchedIndexes: Dictionary<boolean, number> = {}

  return expectedItems.every((expectedItem) => {
    const foundIndex = actualItems.findIndex(
      (actualItem, index) => isEqual(actualItem, expectedItem) && !matchedIndexes[index],
    )

    if (foundIndex !== -1) {
      matchedIndexes[foundIndex] = true

      return true
    } else {
      return false
    }
  })
}
