import { isIterableAndNotString } from '../validators/common'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an iterable containing a given item.
 */
export class ContainerWithMatcher<T> extends Matcher {
  constructor(private readonly item: T) {
    super()
  }

  check(v: unknown): boolean {
    if (!isIterableAndNotString(v)) {
      return false
    }

    const items = Array.from(v)

    return items.some((i) => smartEq(i, this.item).result === 'success')
  }

  toString() {
    return `[ContainerWith: ${this.item}]`
  }

  // TODO: for now this has to be typed as any. Otherwise types won't match ie.
  // toEqual([1], ContainerWithMatcher.make(...))
  // [1] has to have exactly the same type as return of this function
  // if we type it as T[] it's fine but then it won't work with iterators
  // if we type is as IterableIterator<T> then it is not assignable to T[] anymore :/
  // this is a problem for all polymorphic matchers
  static make(item: any): any {
    return new ContainerWithMatcher(item) as any
  }
}
