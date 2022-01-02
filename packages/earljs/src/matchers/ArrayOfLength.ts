import { formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { Matcher } from './Base'

export class ArrayOfLengthMatcher extends Matcher {
  constructor(private readonly expectedLength: number) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return isEqual(actualItems.length, this.expectedLength)
  }

  toString() {
    return `[ArrayOfLength: ${formatCompact(this.expectedLength)}]`
  }

  static make<T>(length: number): T[] {
    return new ArrayOfLengthMatcher(length) as any
  }
}
