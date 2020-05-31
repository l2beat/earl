import { Matcher } from './Base'

/**
 * Matches any error with matching string
 */
export class ErrorMatcher extends Matcher {
  constructor(private readonly expectedMsg: string) {
    super()
  }

  check(v: unknown) {
    return v instanceof Error && v.message === this.expectedMsg
  }

  toString() {
    return `Error: ${this.expectedMsg}`
  }

  static make(msg: string): Error {
    return new ErrorMatcher(msg) as any
  }
}
