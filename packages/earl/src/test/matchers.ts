import { expect } from 'chai'

import { formatCompact } from '../format/index.js'

// biome-ignore lint/suspicious/noExportsInTest: This is a test utility
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

// biome-ignore lint/suspicious/noExportsInTest: This is a test utility
export function testMatcherFormat(matcher: never, expected: string) {
  it(`formats as ${expected}`, () => {
    // biome-ignore lint/suspicious/noExplicitAny: any is required here
    expect((matcher as any).toString()).to.equal(expected)
  })
}
