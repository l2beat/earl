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

    const matchedIndexes: Dictionary<boolean, number> = {}

    return this.expectedItems.every((expectedItem) => {
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

  toString() {
    return `[ArrayWith: ${this.expectedItems}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}
