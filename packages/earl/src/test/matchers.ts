import { expect } from 'chai'

import { formatCompact } from '../format/index.js'

export function testMatcher(
  matcher: (value: unknown) => boolean,
  trueCases: unknown[],
  falseCases: unknown[],
) {
  for (const value of trueCases) {
    it(`returns true for ${formatCompact(value)}`, () => {
      expect(matcher(value)).to.equal(true)
    })
  }

  for (const value of falseCases) {
    it(`returns false for ${formatCompact(value)}`, () => {
      expect(matcher(value)).to.equal(false)
    })
  }
}

export function testMatcherFormat(matcher: any, expected: string) {
  it(`formats as ${expected}`, () => {
    expect((matcher as any).toString()).to.equal(expected)
  })
}
