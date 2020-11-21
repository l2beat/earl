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

    return v.some((i) => this.items.every(item => smartEq(i, item).result === 'success'))
  }

  toString() {
    return `[ArrayWith: ${this.items}]`
  }

  static make(...items: any[]): any {
    return new ArrayWithMatcher(items) as any
  }
}
