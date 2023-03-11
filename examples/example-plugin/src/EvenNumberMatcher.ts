import { AMatcher, Matcher } from 'earljs/internals'

export class EvenNumberMatcher extends Matcher {
  toString() {
    return '[EvenNumberMatcher]'
  }

  check(value: unknown): boolean {
    const aMatcher = new AMatcher(Number) // use core matcher
    return aMatcher.check(value) && (value as number) % 2 === 0
  }

  static make(): number {
    return new EvenNumberMatcher() as unknown as number
  }
}
