import { Matcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    stringMatching(substringOrPattern: string | RegExp): string
  }
}

registerMatcher(
  'stringMatching',
  (substringOrPattern: string | RegExp) =>
    new StringMatchingMatcher(substringOrPattern),
)

export class StringMatchingMatcher extends Matcher {
  constructor(private readonly substringOrPattern: string | RegExp) {
    super()
  }

  check(v: unknown) {
    if (typeof v !== 'string') {
      return false
    }

    if (typeof this.substringOrPattern === 'string') {
      return v.includes(this.substringOrPattern)
    } else {
      return this.substringOrPattern.test(v)
    }
  }

  toString(): string {
    return `[StringMatching: ${this.substringOrPattern.toString()}]`
  }
}
