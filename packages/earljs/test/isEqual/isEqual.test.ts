import { expect } from 'chai'

import { format, FormatOptions } from '../../src/format'
import { EqualityOptions, isEqual } from '../../src/isEqual'

describe('isEqual', () => {
  const DEFAULTS: EqualityOptions = {
    looseFunctionCompare: false,
    looseSymbolCompare: false,
    minusZero: false,
    uniqueNaNs: false,
  }
  const FORMAT_OPTIONS: FormatOptions = {
    ...DEFAULTS,
    minusZero: true,
  }

  interface TestCaseGroup {
    name: string
    testCases: TestCase[]
  }
  type TestCase = [unknown, unknown, boolean, Partial<EqualityOptions>?]

  const groups: TestCaseGroup[] = [
    {
      name: 'numbers',
      testCases: [
        [1, 1, true],
        [-1, -1, true],
        [0, 0, true],
        [0, 1, false],
        [123.456, 123.456, true],
        [123.456, -123.456, false],
        [0, -0, true],
        [0, -0, false, { minusZero: true }],
        [NaN, NaN, true],
        [NaN, NaN, false, { uniqueNaNs: true }],
        [Infinity, Infinity, true],
        [Infinity, -Infinity, false],
        [-Infinity, -Infinity, true],
      ],
    },
  ]

  for (const { name, testCases } of groups) {
    describe(name, () => {
      for (const [a, b, expected, options] of testCases) {
        const aFmt = format(a, null, FORMAT_OPTIONS)
        const bFmt = format(b, null, FORMAT_OPTIONS)
        const operator = expected ? '==' : '!='
        const flags = options ? ` [${Object.keys(options).join(' ')}]` : ''
        it(`${aFmt} ${operator} ${bFmt}${flags}`, () => {
          const result = isEqual(a, b, { ...DEFAULTS, ...options })
          expect(result).to.equal(expected)
        })
      }
    })
  }
})
