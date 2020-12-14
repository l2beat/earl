import { Newable } from '../types'
import { smartEq } from '../validators/smartEq'
import { Matcher } from './Base'

export class ErrorMatcher extends Matcher {
  constructor(private readonly errorClass: Newable<Error> = Error, private readonly message?: string) {
    super()
  }

  check(v: unknown) {
    if (!(v instanceof this.errorClass)) {
      return false
    }

    if (this.message !== undefined) {
      return smartEq(v.message, this.message).result === 'success'
    }

    return true
  }

  toString() {
    if (this.message === undefined) {
      return `${this.errorClass.name}`
    }
    return `[${this.errorClass.name}: ${this.message}]`
  }

  static make(classOrMessage: string | Newable<Error>, message?: string): Error {
    if (typeof classOrMessage === 'string' || classOrMessage instanceof Matcher) {
      return new ErrorMatcher(Error, classOrMessage as any) as any
    }
    return new ErrorMatcher(classOrMessage as any, message) as any
  }
}
