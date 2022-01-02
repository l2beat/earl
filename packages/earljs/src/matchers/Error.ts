import { formatCompact } from '../format'
import { isEqual } from '../isEqual'
import { Newable } from '../types'
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
      return isEqual(v.message, this.message)
    }

    return true
  }

  toString() {
    return `[Error: ${this.format()}]`
  }

  format() {
    if (this.message === undefined) {
      return `${this.errorClass.name}`
    }
    return `${this.errorClass.name}(${formatCompact(this.message)})`
  }

  static make(classOrMessage: string | Newable<Error>, message?: string): Error {
    if (typeof classOrMessage === 'string' || classOrMessage instanceof Matcher) {
      return new ErrorMatcher(Error, classOrMessage as any) as any
    }
    return new ErrorMatcher(classOrMessage as any, message) as any
  }
}
