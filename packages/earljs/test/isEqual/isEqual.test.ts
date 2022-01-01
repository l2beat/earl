/* eslint-disable symbol-description */
import { expect } from 'chai'

import { format, FormatOptions } from '../../src/format'
import { EqualityOptions, isEqual } from '../../src/isEqual'

describe('isEqual', () => {
  const DEFAULTS: EqualityOptions = {
    looseFunctionCompare: false,
    looseSymbolCompare: false,
    minusZero: false,
    uniqueNaNs: false,
    strictObjectKeyOrder: false,
  }
  const FORMAT_OPTIONS: FormatOptions = {
    ...DEFAULTS,
    minusZero: true,
    indentSize: 2,
    inline: true,
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
    {
      name: 'functions',
      testCases: [
        [function a() {}, function a() {}, false],
        [...twice(function a() {}), true],
        [function a() {}, function a() {}, true, { looseFunctionCompare: true }],
        [
          function a() {
            return 1
          },
          function a() {
            return 2
          },
          false,
          { looseFunctionCompare: true },
        ],
        [function () {}, function () {}, false],
        [...twice(function () {}), true],
        [function () {}, function () {}, true, { looseFunctionCompare: true }],
        [Set.prototype.has, Set.prototype.has, true],
        [Set.prototype.has, Map.prototype.has, false],
        [Set.prototype.has, Map.prototype.has, true, { looseFunctionCompare: true }],
        [class A {}, class A {}, false],
        [...twice(class A {}), true],
        [class A {}, class A {}, true, { looseFunctionCompare: true }],
        [class A {}, function A() {}, false, { looseFunctionCompare: true }],
        [Array, Array, true],
        [Array, Error, false],
      ],
    },
    {
      name: 'objects',
      testCases: [
        [{}, {}, true],
        [{ x: 1 }, { x: 1 }, true],
        [{ x: 1, y: 2 }, { x: 1, y: 2 }, true],
        [{ x: 1, y: 2 }, { x: 1, y: 3 }, false],
        [{ x: 1, y: { a: 'x', b: 'y' } }, { x: 1, y: { a: 'x', b: 'y' } }, true],
        [{ x: 1, y: 2 }, { y: 2, x: 1 }, true],
        [{ x: 1, y: 2 }, { y: 2, x: 1 }, false, { strictObjectKeyOrder: true }],
        [{ x: 1, y: 2 }, { x: 1, y: 2 }, true, { strictObjectKeyOrder: true }],
        [{ x: 1, [Symbol()]: 1 }, { x: 1, [Symbol()]: 1 }, false],
        [{ x: 1, [Symbol()]: 1 }, { x: 1, [Symbol()]: 1 }, true, { looseSymbolCompare: true }],
        [{ [Symbol.for('x')]: 1, [Symbol.for('y')]: 1 }, { [Symbol.for('x')]: 1, [Symbol.for('y')]: 1 }, true],
        [{ [Symbol.for('x')]: 1, [Symbol.for('y')]: 1 }, { [Symbol.for('y')]: 1, [Symbol.for('x')]: 1 }, true],
        [
          { [Symbol.for('x')]: 1, [Symbol.for('y')]: 1 },
          { [Symbol.for('y')]: 1, [Symbol.for('x')]: 1 },
          false,
          { strictObjectKeyOrder: true },
        ],
        [
          { [Symbol.for('x')]: 1, [Symbol.for('y')]: 1 },
          { [Symbol.for('y')]: 1, [Symbol.for('x')]: 1 },
          true,
          { looseSymbolCompare: true },
        ],
      ],
    },
    {
      name: 'function objects',
      testCases: [
        [
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          false,
        ],
        [
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          true,
          { looseFunctionCompare: true },
        ],
        [
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          (() => {
            function x() {}
            x.a = 2
            return x
          })(),
          false,
          { looseFunctionCompare: true },
        ],
        [
          ...twice(
            (() => {
              function x() {}
              x.a = 1
              return x
            })(),
          ),
          true,
        ],
        [
          class X {
            static a = 1
          },
          class X {
            static a = 1
          },
          false,
        ],
        [
          class X {
            static a = 1
          },
          class X {
            static a = 1
          },
          true,
          { looseFunctionCompare: true },
        ],
        [
          class X {
            static a = 1
          },
          class X {
            static a = 2
          },
          false,
          { looseFunctionCompare: true },
        ],
        [
          ...twice(
            class X {
              static a = 1
            },
          ),
          true,
        ],
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
          const formatOptions = { ...equalityOptions, indentSize: 2, inline: false }

          it('a -> b', () => {
            const result = isEqual(a, b, equalityOptions)
            expect(result).to.equal(expected)
          })

          it('b -> a', () => {
            const result = isEqual(b, a, equalityOptions)
            expect(result).to.equal(expected)
          })

          it('format a -> b', () => {
            const aDiff = format(a, null, formatOptions)
            const bDiff = format(b, a, formatOptions)
            if (expected) {
              expect(aDiff).to.equal(bDiff)
            } else {
              expect(aDiff).not.to.equal(bDiff)
            }
          })

          it('format b -> a', () => {
            const aDiff = format(a, b, formatOptions)
            const bDiff = format(b, null, formatOptions)
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
