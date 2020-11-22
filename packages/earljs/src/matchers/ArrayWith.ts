import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an array containing the given item.
 */
export class ArrayWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: ReadonlyArray<T>) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return this.expectedItems.every((expectedItem) =>
      actualItems.some((actualItem) => smartEq(actualItem, expectedItem).result === 'success'),
    )
  }

  toString() {
    return `[ArrayWith: ${this.expectedItems}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}
