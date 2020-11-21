import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches an array containing the given item.
 */
export class ArrayWithMatcher<T> extends Matcher {
  constructor(private readonly items: ReadonlyArray<T>) {
    super()
  }

  check(v: unknown): boolean {
    if (!Array.isArray(v)) {
      return false
    }

    return v.some((i) => this.items.some((item) => smartEq(i, item).result === 'success'))
  }

  toString() {
    return `[ArrayWith: ${this.items}]`
  }

  static make<T>(...items: T[]): T[] {
    return new ArrayWithMatcher(items) as any
  }
}
