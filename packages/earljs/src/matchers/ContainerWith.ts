import { isIterableAndNotString } from '../validators/common'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an iterable containing a given item.
 */
export class ContainerWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: ReadonlyArray<T>) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!isIterableAndNotString(actualItems)) {
      return false
    }

    const items = Array.from(actualItems)

    return this.expectedItems.every((expectedItem) =>
      items.some((actualItem) => smartEq(actualItem, expectedItem).result === 'success'),
    )
  }

  toString() {
    return `[ContainerWith: ${this.expectedItems}]`
  }

  // TODO: for now this has to be typed as any. Otherwise types won't match ie.
  // toEqual([1], ContainerWithMatcher.make(...))
  // [1] has to have exactly the same type as return of this function
  // if we type it as T[] it's fine but then it won't work with iterators
  // if we type is as IterableIterator<T> then it is not assignable to T[] anymore :/
  // this is a problem for all polymorphic matchers
  static make(...items: any[]): any {
    return new ContainerWithMatcher(items) as any
  }
}
