import { Dictionary } from 'ts-essentials'

import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

export class ArrayWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: ReadonlyArray<T>) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return contains(this.expectedItems, actualItems)
  }

  toString() {
    return `[ArrayWith: ${this.expectedItems}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}

/** @internal */
export function contains(expectedItems: ReadonlyArray<any>, actualItems: ReadonlyArray<any>): boolean {
  const matchedIndexes: Dictionary<boolean, number> = {}

  return expectedItems.every((expectedItem) => {
    const foundIndex = actualItems.findIndex(
      (actualItem, index) => smartEq(actualItem, expectedItem).result === 'success' && !matchedIndexes[index],
    )

    if (foundIndex !== -1) {
      matchedIndexes[foundIndex] = true

      return true
    } else {
      return false
    }
  })
}
