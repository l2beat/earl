import { isEqual } from '../isEqual'
import { Matcher } from './Base'

export class ArrayWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: ReadonlyArray<T>) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return this.expectedItems.every((expectedItem) =>
      actualItems.some((actualItem) => isEqual(actualItem, expectedItem)),
    )
  }

  toString() {
    return `[ArrayWith: ${this.expectedItems}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}
