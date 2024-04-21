import { expect } from 'chai'

import { type FormatOptions, format } from '../format/index.js'
import { expect as earl } from '../index.js'
import type { EqualityOptions } from './EqualityOptions.js'
import { isEqual } from './isEqual.js'

describe('isEqual', () => {
  const DEFAULTS: EqualityOptions & { oneWay: boolean } = {
    minusZero: false,
    uniqueNaNs: false,
    ignorePrototypes: false,
    compareErrorStack: false,
    oneWay: false,
  }
  const FORMAT_OPTIONS: FormatOptions = {
    ...DEFAULTS,
    minusZero: true,
    indentSize: 2,
    inline: true,
    maxLineLength: Number.POSITIVE_INFINITY,
    skipMatcherReplacement: true,
    requireStrictEquality: false,
  }

  interface TestCaseGroup {
    name: string
    testCases: TestCase[]
  }
  type TestCase = [
    unknown,
    unknown,
    boolean,
    Partial<EqualityOptions & { oneWay: boolean }>?,
  ]

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
        [Number.NaN, Number.NaN, true],
        [Number.NaN, Number.NaN, false, { uniqueNaNs: true }],
        [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, true],
        [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, false],
        [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, true],
      ],
    },
    {
      name: 'symbols',
      testCases: [
        [Symbol(), Symbol(), false],
        [...twice(Symbol()), true],
        [Symbol('foo'), Symbol('foo'), false],
        [...twice(Symbol('foo')), true],
        [Symbol.for('foo'), Symbol.for('foo'), true],
        [Symbol.for('foo'), Symbol.for('bar'), false],
        [Symbol.for('foo'), Symbol('foo'), false],
        [Symbol.iterator, Symbol.iterator, true],
        [Symbol.iterator, Symbol.asyncIterator, false],
      ],
    },
    {
      name: 'strings',
      testCases: [
        ['foo', 'foo', true],
        ['foo', 'bar', false],
        ['', ' ', false],
      ],
    },
    {
      name: 'bigints',
      testCases: [
        [BigInt(1), BigInt(1), true],
        [BigInt(1), BigInt(-2), false],
        [BigInt(0), BigInt(-0), true],
        // minus zero does not affect bigint
        [BigInt(0), BigInt(-0), true, { minusZero: true }],
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
        ...(() => {
          const options = [
            function named() {},
            function* named() {},
            async function named() {},
            async function* named() {},
            () => {},
            function* () {},
            async () => {},
            async function* () {},
          ]
          const testCases: TestCase[] = []
          for (let i = 0; i < options.length; i++) {
            for (let j = i; j < options.length; j++) {
              testCases.push([
                options[i],
                options[j],
                options[i] === options[j],
              ])
            }
          }
          return testCases
        })(),
        [Set.prototype.has, Set.prototype.has, true],
        [Set.prototype.has, Map.prototype.has, false],
        [class A {}, class A {}, false],
        [...twice(class A {}), true],
        [class {}, class {}, false],
        [...twice(class {}), true],
        [class A {}, function A() {}, false],
        [Array, Array, true],
        [Array, Map, false],
        [
          function x() {},
          Object.assign(function x() {}, { foo: 'bar' }),
          false,
        ],
        [
          Object.assign(function x() {}, { foo: 'bar' }),
          Object.assign(function x() {}, { foo: 'bar' }),
          false,
        ],
        [...twice(Object.assign(function x() {}, { foo: 'bar' })), true],
      ],
    },
    {
      name: 'objects',
      testCases: [
        [{}, {}, true],
        [{}, null, false],
        [{ x: 1 }, { x: 1 }, true],
        [{ x: 1, y: 2 }, { x: 1, y: 2 }, true],
        [{ x: 1, y: 2 }, { x: 1, y: 3 }, false],
        [
          { x: 1, y: { a: 'x', b: 'y' } },
          { x: 1, y: { a: 'x', b: 'y' } },
          true,
        ],
        [{ x: 1, y: 2 }, { y: 2, x: 1 }, true],
        ...(() => {
          class Vector2 {
            constructor(
              public x: number,
              public y: number,
            ) {}
          }
          return [
            [new Vector2(1, 2), new Vector2(1, 2), true],
            [new Vector2(1, 2), new Vector2(3, 4), false],
            [new Vector2(1, 2), { x: 1, y: 2 }, false],
            [
              new Vector2(1, 2),
              { x: 1, y: 2 },
              true,
              { ignorePrototypes: true },
            ],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'self-referencing objects',
      testCases: [
        [
          (() => {
            const x = { y: 2 }
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            ;(x as any).x = x
            return x
          })(),
          (() => {
            const x = { y: 2 }
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            ;(x as any).x = x
            return x
          })(),
          true,
        ],
        [
          (() => {
            const x = { y: 2 }
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            ;(x as any).x = x
            return x
          })(),
          (() => {
            const x = { x: { y: 2 }, y: 2 }
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            ;(x.x as any).x = x
            return x
          })(),
          false,
        ],
        ...(() => {
          interface Node {
            prev?: Node
            next?: Node
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            value: any
          }
          // biome-ignore lint/suspicious/noExplicitAny: any is required here
          const node = (value: any): Node => ({ value })
          // biome-ignore lint/suspicious/noExplicitAny: any is required here
          const list = (...values: any[]) =>
            values.map(node).map((node, index, nodes) => {
              node.prev = nodes[index - 1]
              node.next = nodes[index + 1]
              return node
            })[0]

          const a = list(1, 2, 3)
          const b = list(1, 2, 3)
          const c = list(4, 5)

          return [
            [a, b, true],
            [b, c, false],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'arrays',
      testCases: [
        [[], [], true],
        [[1, 2, 3], [1, 2, 3], true],
        [[1, 2, 3], [1, 'boo', 'asd'], false],
        [new Array(3), [undefined, undefined, undefined], false],
        [new Array(3), new Array(3), true],
        [new Array(3), new Array(4), false],
        [Object.assign([1, 2, 3], { foo: 'bar' }), [1, 2, 3], false],
        [
          Object.assign([1, 2, 3], { foo: 'bar' }),
          Object.assign([1, 2, 3], { foo: 'bar' }),
          true,
        ],
        [[1, 2, 3], { 0: 1, 1: 2, 2: 3 }, false],
      ],
      ...(() => {
        class MyArray extends Array {}
        return [
          [MyArray.from([1, 2]), MyArray.from([1, 2]), true],
          [MyArray.from([1, 2]), MyArray.from([3, 4]), false],
          [MyArray.from([1, 2]), [1, 2], false],
          [MyArray.from([1, 2]), [1, 2], true, { ignorePrototypes: true }],
        ] as TestCase[]
      })(),
    },
    {
      name: 'dates',
      testCases: [
        [
          new Date('2005-04-02T21:37:00.000+02:00'),
          new Date('2005-04-02T19:37:00.000Z'),
          true,
        ],
        [
          Object.assign(new Date('2005-04-02T21:37:00.000+02:00'), {
            foo: 'bar',
          }),
          new Date('2005-04-02T21:37:00.000+02:00'),
          false,
        ],
        [
          Object.assign(new Date('2005-04-02T21:37:00.000+02:00'), {
            foo: 'bar',
          }),
          Object.assign(new Date('2005-04-02T21:37:00.000+02:00'), {
            foo: 'bar',
          }),
          true,
        ],
        ...(() => {
          class MyDate extends Date {}
          return [
            [new Date(123), new MyDate(123), false],
            [new Date(123), new MyDate(123), true, { ignorePrototypes: true }],
            [new MyDate(123), new MyDate(123), true],
            [new MyDate(123), new MyDate(456), false],
            [new MyDate(123), new (class MyDate extends Date {})(123), false],
            [
              new MyDate(123),
              new (class MyDate extends Date {})(123),
              true,
              { ignorePrototypes: true },
            ],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'regexps',
      testCases: [
        [/asd/, /asd/, true],
        [/asd/, /asd/i, false],
        [Object.assign(/asd/, { foo: 'bar' }), /asd/, false],
        [
          Object.assign(/asd/, { foo: 'bar' }),
          Object.assign(/asd/, { foo: 'bar' }),
          true,
        ],
        ...(() => {
          class MyRegExp extends RegExp {}
          return [
            [/foo/, new MyRegExp('foo'), false],
            [/foo/, new MyRegExp('foo'), true, { ignorePrototypes: true }],
            [new MyRegExp('foo'), new MyRegExp('foo'), true],
            [new MyRegExp('foo'), new MyRegExp('bar'), false],
            [
              new MyRegExp('foo'),
              new (class MyRegExp extends RegExp {})('foo'),
              false,
            ],
            [
              new MyRegExp('foo'),
              new (class MyRegExp extends RegExp {})('foo'),
              true,
              { ignorePrototypes: true },
            ],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'primitive classes',
      testCases: [
        [new String('foo'), new String('foo'), true],
        [new String('foo'), new String('bar'), false],
        [new String('foo'), 'foo', false],
        [new Number(123), new Number(123), true],
        [new Number(123), new Number(456), false],
        [new Number(123), 123, false],
        [new Boolean(true), new Boolean(true), true],
        [new Boolean(true), new Boolean(false), false],
        [new Boolean(true), true, false],
        [
          Object.assign(new String('foo'), { foo: 'bar' }),
          new String('foo'),
          false,
        ],
        [
          Object.assign(new String('foo'), { foo: 'bar' }),
          Object.assign(new String('foo'), { foo: 'bar' }),
          true,
        ],
        ...(() => {
          class MyString extends String {}
          class MyNumber extends Number {}
          class MyBoolean extends Boolean {}

          return [
            [new String('foo'), new MyString('foo'), false],
            [
              new String('foo'),
              new MyString('foo'),
              true,
              { ignorePrototypes: true },
            ],
            [new MyString('foo'), new MyString('foo'), true],
            [new MyString('foo'), new MyString('bar'), false],
            [
              new MyString('foo'),
              new (class MyString extends String {})('foo'),
              false,
            ],
            [
              new MyString('foo'),
              new (class MyString extends String {})('foo'),
              true,
              { ignorePrototypes: true },
            ],

            [new Number(123), new MyNumber(123), false],
            [
              new Number(123),
              new MyNumber(123),
              true,
              { ignorePrototypes: true },
            ],
            [new MyNumber(123), new MyNumber(123), true],
            [new MyNumber(123), new MyNumber(456), false],
            [
              new MyNumber(123),
              new (class MyNumber extends Number {})(123),
              false,
            ],
            [
              new MyNumber(123),
              new (class MyNumber extends Number {})(123),
              true,
              { ignorePrototypes: true },
            ],

            [new Boolean(true), new MyBoolean(true), false],
            [
              new Boolean(true),
              new MyBoolean(true),
              true,
              { ignorePrototypes: true },
            ],
            [new MyBoolean(true), new MyBoolean(true), true],
            [new MyBoolean(true), new MyBoolean(false), false],
            [
              new MyBoolean(true),
              new (class MyBoolean extends Boolean {})(true),
              false,
            ],
            [
              new MyBoolean(true),
              new (class MyBoolean extends Boolean {})(true),
              true,
              { ignorePrototypes: true },
            ],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'unique instances',
      testCases: [
        [Promise.resolve('foo'), Promise.resolve('foo'), false],
        [...twice(Promise.resolve('foo')), true],
        [new WeakMap(), new WeakMap(), false],
        [...twice(new WeakMap()), true],
        [new WeakSet(), new WeakSet(), false],
        [...twice(new WeakSet()), true],
        ...(() => {
          class MyPromise extends Promise<number> {}
          class MyWeakMap extends WeakMap {}
          class MyWeakSet extends WeakSet {}

          return [
            [MyPromise.resolve(1), MyPromise.resolve(1), false],
            [MyPromise.resolve(1), Promise.resolve(1), false],
            [new MyWeakMap(), new MyWeakMap(), false],
            [new MyWeakMap(), new WeakMap(), false],
            [new MyWeakSet(), new MyWeakSet(), false],
            [new MyWeakSet(), new WeakSet(), false],
          ] as TestCase[]
        })(),
      ],
    },
    {
      name: 'errors',
      testCases: [
        [new Error('foo'), new Error('foo'), true],
        [
          new Error('foo'),
          new Error('foo'),
          false,
          { compareErrorStack: true },
        ],
        [
          Object.assign(new Error('foo'), { stack: 'asd' }),
          Object.assign(new Error('foo'), { stack: 'asd' }),
          true,
          { compareErrorStack: true },
        ],
        [new Error('foo'), new Error('bar'), false],
        [new TypeError('foo'), new TypeError('foo'), true],
        [new Error('foo'), new TypeError('foo'), false],
        [
          new Error('foo'),
          new TypeError('foo'),
          false,
          { ignorePrototypes: true },
        ],
        [
          new (class MyError extends Error {})('foo'),
          new (class MyError extends Error {})('foo'),
          false,
        ],
        [
          new (class MyError extends Error {})('foo'),
          new (class MyError extends Error {})('foo'),
          true,
          { ignorePrototypes: true },
        ],
      ],
    },
    {
      name: 'matchers',
      testCases: [
        [
          { x: 1, y: 2 },
          { x: earl.a(Number), y: earl.a(Number) },
          true,
          { oneWay: true },
        ],
        [
          { x: 1, y: 2 },
          { x: earl.a(Number), y: earl.a(String) },
          false,
          { oneWay: true },
        ],
        [[], [earl.anything()], false, { oneWay: true }],
        [
          (() => {
            const x = { x: { y: { z: {} } } }
            x.x.y.z = x
            return x
          })(),
          { x: earl.anything() },
          true,
          { oneWay: true },
        ],
      ],
    },
    {
      name: 'sets',
      testCases: [
        [new Set(), new Set(), true],
        [new Set([1, 2, 3]), new Set([3, 1, 2]), true],
        [new Set([1, 2, 3]), new Set([1, 2]), false],
        [new Set([1, 2, 3]), new Set([4, 1, 2]), false],
        [new Set([{}]), new Set([{}]), false],
        [
          ...(() => {
            const a = { x: 1 }
            const b = { y: 2 }
            return [new Set([a, b]), new Set([b, a])] as const
          })(),
          true,
        ],
        [
          ...(() => {
            const a = { x: 1 }
            return [new Set([a, { y: 2 }]), new Set([{ y: 2 }, a])] as const
          })(),
          false,
        ],
      ],
    },
    {
      name: 'maps',
      testCases: [
        [new Map(), new Map(), true],
        [new Map([[1, { x: 1 }]]), new Map([[1, { x: 1 }]]), true],
        [new Map([[1, { x: 1 }]]), new Map([[1, { x: 2 }]]), false],
        [new Map([[{}, { x: 1 }]]), new Map([[{}, { x: 1 }]]), false],
        [
          new Map([
            [1, 'a'],
            [2, 'b'],
          ]),
          new Map([
            [2, 'b'],
            [1, 'a'],
          ]),
          true,
        ],
        [
          new Map([
            [1, 'a'],
            [2, 'b'],
          ]),
          new Map([[1, 'a']]),
          false,
        ],
        [
          new Map([[1, 'a']]),
          new Map([[1, earl.anything()]]),
          true,
          { oneWay: true },
        ],
        [
          Object.assign(new Map([[1, 'a']]), { foo: 'bar' }),
          new Map([[1, 'a']]),
          false,
        ],
        [
          ...(() => {
            const a = { x: 1 }
            const b = { y: 2 }
            return [
              new Map<unknown, number>([
                [a, 1],
                [b, 2],
              ]),
              new Map<unknown, number>([
                [b, 2],
                [a, 1],
              ]),
            ] as const
          })(),
          true,
        ],
        [
          ...(() => {
            const a = { x: 1 }
            return [
              new Map<unknown, number>([
                [a, 1],
                [{ y: 2 }, 2],
              ]),
              new Map<unknown, number>([
                [{ y: 2 }, 2],
                [a, 1],
              ]),
            ] as const
          })(),
          false,
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
          const formatOptions: FormatOptions = {
            ...equalityOptions,
            indentSize: 2,
            inline: false,
            maxLineLength: Number.POSITIVE_INFINITY,
            skipMatcherReplacement: false,
            requireStrictEquality: false,
          }

          it('a -> b', () => {
            const result = isEqual(a, b, equalityOptions)
            expect(result).to.equal(expected)
          })

          if (!equalityOptions.oneWay) {
            it('b -> a', () => {
              const result = isEqual(b, a, equalityOptions)
              expect(result).to.equal(expected)
            })
          }

          it('format a -> b', () => {
            const aDiff = format(a, null, formatOptions)
            const bDiff = format(b, a, formatOptions)
            if (expected) {
              expect(aDiff).to.equal(bDiff)
            } else {
              expect(aDiff).not.to.equal(bDiff)
            }
          })

          if (!equalityOptions.oneWay) {
            it('format b -> a', () => {
              const aDiff = format(a, b, formatOptions)
              const bDiff = format(b, null, formatOptions)
              if (expected) {
                expect(aDiff).to.equal(bDiff)
              } else {
                expect(aDiff).not.to.equal(bDiff)
              }
            })
          }
        })
      }
    })
  }
})
