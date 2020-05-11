import { AsymmetricMatcher } from './Base'

export class AnythingMatcher extends AsymmetricMatcher {
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
