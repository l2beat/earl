import { Matcher } from './Base'

export class AnythingMatcher extends Matcher {
  check(_v: any) {
    return true
  }

  static make(): any {
    return new AnythingMatcher()
  }
}
