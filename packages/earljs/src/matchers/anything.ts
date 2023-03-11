import { Matcher, registerMatcher } from '../expect'

declare module '../expect' {
  interface Matchers {
    anything(): any
  }
}

registerMatcher('anything', () => new AnythingMatcher())

export class AnythingMatcher extends Matcher {
  check(value: unknown) {
    return true
  }

  toString() {
    return `[Anything]`
  }
}
