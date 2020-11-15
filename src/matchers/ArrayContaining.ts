import { isIterableAndNotString } from '../validators/common'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an array containing given item.
 */
export class ArrayContainingMatcher<T> extends Matcher {
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
    return `[ArrayContaining: ${this.item}]`
  }

  static make<T>(item: T): Array<T> {
    return new ArrayContainingMatcher(item) as any
  }
}
