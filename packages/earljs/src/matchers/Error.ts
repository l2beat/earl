import { Newable } from '../types'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

/**
 * Matches any error with matching string
 */
export class ErrorMatcher extends Matcher {
  constructor(private readonly errorCls: Newable<Error> = Error, private readonly expectedMsg?: string) {
    super()
  }

  check(v: unknown) {
    if (!(v instanceof this.errorCls)) {
      return false
    }

    if (this.expectedMsg !== undefined) {
      return smartEq(v.message, this.expectedMsg).result === 'success'
    }

    return true
  }

  toString() {
    if (this.expectedMsg === undefined) {
      return `${this.errorCls.name}`
    }
    return `[${this.errorCls.name}: ${this.expectedMsg}]`
  }

  static make(expectedMsg: string): Error
  static make(errorCls: Newable<Error>, expectedMsg?: string): Error
  static make(errorClsOrExpectedMsg: string | Newable<Error>, expectedMsg?: string): Error {
    if (typeof errorClsOrExpectedMsg === 'string' || errorClsOrExpectedMsg instanceof Matcher) {
      return new ErrorMatcher(Error, errorClsOrExpectedMsg as any) as any
    }
    return new ErrorMatcher(errorClsOrExpectedMsg as any, expectedMsg) as any
  }
}
