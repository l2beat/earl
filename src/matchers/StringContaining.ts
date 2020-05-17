import { Matcher } from './Base'

/**
 * Matches any string that contains another string
 */
export class StringContainingMatcher extends Matcher {
  constructor(private readonly substring: string) {
    super()
  }

  check(v: any) {
    return typeof v === 'string' && v.indexOf(this.substring) !== -1
  }

  static make(substring: string): string {
    return new StringContainingMatcher(substring) as any
  }
}
