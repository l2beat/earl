import { AsymmetricMatcher } from './Base'

export class AnythingMatcher extends AsymmetricMatcher {
  check(_v: any) {
    return true
  }

  static make(): any {
    return new AnythingMatcher()
  }
}
