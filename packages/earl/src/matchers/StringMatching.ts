import { Matcher } from './Base'

/**
 * Matches any string that contains another string
 */
export class StringMatchingMatcher extends Matcher {
  private readonly pattern: RegExp
  constructor(substring: string)
  constructor(pattern: RegExp)
  constructor(patternOrSubString: string | RegExp) {
    super()

    if (typeof patternOrSubString === 'string') {
      this.pattern = new RegExp(patternOrSubString)
    } else {
      this.pattern = patternOrSubString
    }
  }

  check(v: unknown) {
    return typeof v === 'string' && this.pattern.test(v)
  }

  toString(): string {
    return `[StringMatching: ${this.pattern}]`
  }

  static make(substring: string): string
  static make(pattern: RegExp): string
  static make(patternOrSubString: string | RegExp): string {
    return new StringMatchingMatcher(patternOrSubString as any) as any
  }
}
