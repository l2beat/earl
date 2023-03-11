import { Matcher } from './Base'

export class StringMatchingMatcher extends Matcher {
  constructor(private readonly patternOrSubString: string | RegExp) {
    super()
  }

  check(v: unknown) {
    if (typeof v !== 'string') {
      return false
    }

    if (typeof this.patternOrSubString === 'string') {
      return v.includes(this.patternOrSubString)
    } else {
      return this.patternOrSubString.test(v)
    }
  }

  toString(): string {
    return `[StringMatching: ${this.patternOrSubString.toString()}]`
  }

  static make(patternOrSubString: string | RegExp): string {
    return new StringMatchingMatcher(patternOrSubString as any) as any
  }
}
