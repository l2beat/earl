export abstract class Matcher {
  abstract check(v: any): boolean
  abstract toString(): string
}

export class AnythingMatcher extends Matcher {
  toString() {
    return 'AnythingMatcher'
  }

  check(_v: any) {
    return true
  }

  static make(): AnythingMatcher {
    return new AnythingMatcher()
  }
}
