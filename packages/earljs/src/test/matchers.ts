import { expect } from 'chai'

import { Matcher } from '../expect'
import { formatCompact } from '../format'

export function testMatcher(
  matcher: Matcher,
  trueCases: unknown[],
  falseCases: unknown[],
) {
  for (const value of trueCases) {
    it(`returns true for ${formatCompact(value)}`, () => {
      expect(matcher.check(value)).to.equal(true)
    })
  }

  for (const value of falseCases) {
    it(`returns false for ${formatCompact(value)}`, () => {
      expect(matcher.check(value)).to.equal(false)
    })
  }
}
