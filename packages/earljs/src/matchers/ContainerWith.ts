import { formatCompact } from '../format'
import { contains } from './ArrayWith'
import { Matcher } from './Base'

export class ContainerWithMatcher<T> extends Matcher {
  constructor(private readonly expectedItems: ReadonlyArray<T>) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!isIterableAndNotString(actualItems)) {
      return false
    }

    const items = Array.from(actualItems)

    return contains(this.expectedItems, items)
  }

  toString() {
    return `[ContainerWith: ${formatCompact(this.expectedItems)}]`
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

function isIterableAndNotString(value: any): value is IterableIterator<any> {
  return Symbol.iterator in Object(value) && typeof value !== 'string'
}
