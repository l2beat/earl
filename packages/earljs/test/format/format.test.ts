import { expect } from 'chai'

import { format, FormatOptions } from '../../src/format'

describe('format', () => {
  const DEFAULTS: FormatOptions = {
    looseFunctionCompare: false,
    looseSymbolCompare: false,
    minusZero: false,
    uniqueNaNs: false,
  }

  interface TestCaseGroup {
    name: string
    testCases: TestCase[]
  }
  type TestCase = [unknown, unknown, string, Partial<FormatOptions>?]

  const groups: TestCaseGroup[] = [
    {
      name: 'numbers',
      testCases: [
        [1, null, '1'],
        [0.2, null, '0.2'],
        [-3, null, '-3'],
        [1e50, null, '1e+50'],
        [NaN, null, 'NaN'],
        [NaN, NaN, 'NaN'],
        [NaN, NaN, 'NaN (different)', { uniqueNaNs: true }],
        [Infinity, null, 'Infinity'],
        [-Infinity, null, '-Infinity'],
        [0, null, '0'],
        [-0, null, '0'],
        [-0, null, '-0', { minusZero: true }],
      ],
    },
    {
      name: 'symbols',
      testCases: [
        /* eslint-disable symbol-description */
        [Symbol(), null, 'Symbol()'],
        [Symbol('foo'), null, 'Symbol(foo)'],
        [Symbol('foo'), Symbol('foo'), 'Symbol(foo) (different)'],
        [Symbol('foo'), Symbol('foo'), 'Symbol(foo)', { looseSymbolCompare: true }],
        [Symbol.for('foo'), null, 'Symbol.for("foo")'],
        [Symbol.iterator, null, 'Symbol.iterator'],
        /* eslint-enable symbol-description */
      ],
    },
    {
      name: 'strings',
      testCases: [
        ['foo', null, '"foo"'],
        ['', null, '""'],
        ['a\nb', null, '"a\\nb"'],
      ],
    },
    {
      name: 'bigints',
      testCases: [
        [BigInt(1), null, '1n'],
        [BigInt(0), null, '0n'],
        [BigInt(-1234), null, '-1234n'],
      ],
    },
  ]

  for (const { name, testCases } of groups) {
    describe(name, () => {
      for (const [a, b, expected, options] of testCases) {
        const flags = options ? ` [${Object.keys(options).join(' ')}]` : ''
        it(`${expected}${flags}`, () => {
          const result = format(a, b, { ...DEFAULTS, ...options })
          expect(result).to.equal(expected)
        })
      }
    })
  }
})
