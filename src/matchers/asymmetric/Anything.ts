import { AsymmetricMatcher } from './Base'

export class AnythingMatcher extends AsymmetricMatcher<any> {
  toString() {
    return 'AnythingMatcher'
  }

  check(_v: any) {
    return true
  }

  static make(): any {
    return new AnythingMatcher()
  }
}
