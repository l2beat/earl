import { Matcher } from './Base'

/**
 * Matches any string that contains another string
 */
export class StringMatchingMatcher extends Matcher {
  constructor(substring: string)
  constructor(pattern: RegExp)
  constructor(private readonly patternOrSubString: string | RegExp) {
    super()
  }

  check(v: unknown) {
    if (typeof v !== 'string') {
      return false
    }

    if (typeof this.patternOrSubString === 'string') {
      return v.indexOf(this.patternOrSubString) !== -1
    } else {
      return this.patternOrSubString.test(v)
    }
  }

  toString(): string {
    return `[StringMatching: ${this.patternOrSubString}]`
  }

  static make(substring: string): string
  static make(pattern: RegExp): string
  static make(patternOrSubString: string | RegExp): string {
    return new StringMatchingMatcher(patternOrSubString as any) as any
  }
}
