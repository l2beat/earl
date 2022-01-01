import { expect } from 'chai'
import { isEqual } from '../../src/isEqual'
import { EqualityOptions } from '../../src/isEqual/EqualityOptions'

describe('isEqual', () => {
  const DEFAULTS: EqualityOptions = {
    looseFunctionCompare: false,
    looseSymbolCompare: false,
    minusZero: false,
    uniqueNaNs: false,
  }

  interface TestCaseGroup {
    name: string
    testCases: TestCase[]
  }
  type TestCase = [number, number, boolean, Partial<EqualityOptions>?]

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
        let operator = expected ? '==' : '!='
        let flags = options ? ` [${Object.keys(options).join(' ')}]` : ''
        it(`${a} ${operator} ${b}${flags}`, () => {
          const result = isEqual(a, b, { ...DEFAULTS, ...options })
          expect(result).to.equal(expected)
        })
      }
    })
  }
})
