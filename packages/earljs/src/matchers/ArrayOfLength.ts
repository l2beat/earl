import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

export class ArrayOfLengthMatcher extends Matcher {
  constructor(private readonly expectedLength: number) {
    super()
  }

  check(actualItems: unknown): boolean {
    if (!Array.isArray(actualItems)) {
      return false
    }

    return smartEq(actualItems.length, this.expectedLength).result === 'success'
  }

  toString() {
    return `[ArrayOfLength: ${this.expectedLength}]`
  }

  static make<T>(length: number): T[] {
    return new ArrayOfLengthMatcher(length) as any
  }
}
