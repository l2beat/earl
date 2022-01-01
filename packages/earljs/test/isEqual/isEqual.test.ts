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

  function twice<T>(value: T): [T, T] {
    return [value, value]
  }

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
    {
      name: 'symbols',
      testCases: [
        /* eslint-disable symbol-description */
        [Symbol(), Symbol(), false],
        [Symbol(), Symbol(), true, { looseSymbolCompare: true }],
        [...twice(Symbol()), true],
        [Symbol('foo'), Symbol('foo'), false],
        [...twice(Symbol('foo')), true],
        [Symbol('foo'), Symbol('foo'), true, { looseSymbolCompare: true }],
        [Symbol('foo'), Symbol.for('foo'), false, { looseSymbolCompare: true }],
        [Symbol.for('foo'), Symbol.for('foo'), true],
        [Symbol.for('foo'), Symbol.for('foo'), true, { looseSymbolCompare: true }],
        [Symbol.iterator, Symbol.iterator, true],
        /* eslint-enable symbol-description */
      ],
    },
    {
      name: 'strings',
      testCases: [
        ['foo', 'foo', true],
        ['foo', 'bar', false],
      ],
    },
    {
      name: 'bigints',
      testCases: [
        [BigInt(1), BigInt(1), true],
        [BigInt(1), BigInt(-2), false],
      ],
    },
    {
      name: 'other primitives',
      testCases: [
        [true, true, true],
        [true, false, false],
        [null, null, true],
        [undefined, undefined, true],
        [null, undefined, false],
      ],
    },
    {
      name: 'cross primitive',
      testCases: [
        [0, false, false],
        [0, '', false],
        [1, '1', false],
        [123, BigInt(123), false],
      ],
    },
  ]

  for (const { name, testCases } of groups) {
    describe(name, () => {
      for (const [a, b, expected, options] of testCases) {
        const aFmt = format(a, null, FORMAT_OPTIONS)
        const bFmt = format(b, a, FORMAT_OPTIONS)
        const operator = expected ? '==' : '!='
        const flags = options ? ` [${Object.keys(options).join(' ')}]` : ''
        describe(`${aFmt} ${operator} ${bFmt}${flags}`, () => {
          const equalityOptions = { ...DEFAULTS, ...options }

          it('a -> b', () => {
            const result = isEqual(a, b, equalityOptions)
            expect(result).to.equal(expected)
          })

          it('b -> a', () => {
            const result = isEqual(b, a, equalityOptions)
            expect(result).to.equal(expected)
          })

          it('format a -> b', () => {
            const aDiff = format(a, null, equalityOptions)
            const bDiff = format(b, a, equalityOptions)
            if (expected) {
              expect(aDiff).to.equal(bDiff)
            } else {
              expect(aDiff).not.to.equal(bDiff)
            }
          })

          it('format b -> a', () => {
            const aDiff = format(a, b, equalityOptions)
            const bDiff = format(b, null, equalityOptions)
            if (expected) {
              expect(aDiff).to.equal(bDiff)
            } else {
              expect(aDiff).not.to.equal(bDiff)
            }
          })
        })
      }
    })
  }
})
