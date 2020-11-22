import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an object containing given key-value pairs.
 */
export class ObjectWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItem: T) {
    super()
  }

  check(actualItem: unknown): boolean {
    if (typeof actualItem !== 'object' || actualItem === null) {
      return false
    }

    const expectedEntries = Object.entries(this.expectedItem)

    return expectedEntries.every(([expectedKey, expectedValue]) => {
      const actualValue = (actualItem as any)[expectedKey]

      return smartEq(actualValue, expectedValue).result === 'success'
    })
  }

  toString() {
    return `[ObjectWith: ${this.expectedItem}]`
  }

  static make<T>(expectedItem: T): any {
    return new ObjectWithMatcher(expectedItem) as any
  }
}
