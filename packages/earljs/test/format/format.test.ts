/* eslint-disable symbol-description */
import { expect } from 'chai'

import { format, FormatOptions } from '../../src/format'

describe('format', () => {
  const DEFAULTS: FormatOptions = {
    minusZero: false,
    uniqueNaNs: false,
    indentSize: 2,
    inline: false,
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
        [Symbol(), null, 'Symbol()'],
        [Symbol('foo'), null, 'Symbol(foo)'],
        [Symbol('foo'), Symbol('foo'), 'Symbol(foo) (different)'],
        [Symbol('foo'), Symbol('bar'), 'Symbol(foo)'],
        [Symbol.for('foo'), null, 'Symbol.for("foo")'],
        [Symbol.for('foo'), Symbol.for('foo'), 'Symbol.for("foo")'],
        [Symbol.iterator, null, 'Symbol.iterator'],
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
    {
      name: 'other primitives',
      testCases: [
        [true, null, 'true'],
        [false, null, 'false'],
        [null, null, 'null'],
        [undefined, null, 'undefined'],
      ],
    },
    {
      name: 'functions',
      testCases: [
        [function a() {}, null, 'function a()'],
        [function a() {}, function a() {}, 'function a() (different)'],
        [function () {}, null, 'anonymous function'],
        [function () {}, function () {}, 'anonymous function (different)'],
        [Set.prototype.has, null, 'function has() (native)'],
        [Set.prototype.has, Map.prototype.has, 'function has() (native) (different)'],
        [class A {}, null, 'class A'],
        [class A {}, class A {}, 'class A (different)'],
        [class {}, null, 'anonymous class'],
        [class {}, class {}, 'anonymous class (different)'],
        [Array, null, 'function Array() (native)'],
      ],
    },
    {
      name: 'objects',
      testCases: [
        [{}, null, '{}'],
        [{ x: 1, y: 2 }, null, '{\n  x: 1\n  y: 2\n}'],
        [{ x: 1, y: 2 }, null, '{\n    x: 1\n    y: 2\n}', { indentSize: 4 }],
        [{ x: 1, y: 2 }, null, '{ x: 1, y: 2 }', { inline: true }],
        [{ y: 2, x: 1 }, null, '{\n  x: 1\n  y: 2\n}'],
        [{ '': 1, y: 2 }, null, '{\n  "": 1\n  y: 2\n}'],
        [{ 'foo\nbar': 1 }, null, '{\n  "foo\\nbar": 1\n}'],
        [{ x: 1, y: { a: 'x', b: 'y' } }, null, '{\n  x: 1\n  y: {\n    a: "x"\n    b: "y"\n  }\n}'],
        [{ x: 1, y: { a: 'x', b: 'y' } }, null, '{\n x: 1\n y: {\n  a: "x"\n  b: "y"\n }\n}', { indentSize: 1 }],
        [{ x: 1, y: { a: 'x', b: 'y' } }, null, '{ x: 1, y: { a: "x", b: "y" } }', { inline: true }],
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
          null,
          'function x() & {\n  a: 1\n}',
        ],
        [
          (() => {
            function x() {}
            x.a = 1
            return x
          })(),
          function x() {},
          'function x() (different) & {\n  a: 1\n}',
        ],
        [
          (() => {
            const x = (() => function () {})()
            ;(x as any).a = 1
            return x
          })(),
          null,
          'anonymous function & {\n  a: 1\n}',
        ],
        [
          class X {
            static x = 2
          },
          null,
          'class X & {\n  x: 2\n}',
        ],
        [
          (() => {
            const x = (() => class {})()
            ;(x as any).a = 1
            return x
          })(),
          null,
          'anonymous class & {\n  a: 1\n}',
        ],
      ],
    },
    {
      name: 'self-referencing objects',
      testCases: [
        [
          (() => {
            const x = { y: 2 }
            ;(x as any).x = x
            return x
          })(),
          null,
          '{ x: <Circular .>, y: 2 }',
          { inline: true },
        ],
        [
          (() => {
            const a = { x: 1, y: 1 }
            const x = { a, b: a }
            return x
          })(),
          null,
          '{ a: { x: 1, y: 1 }, b: { x: 1, y: 1 } }',
          { inline: true },
        ],
        [
          (() => {
            const x = { x: { y: { z: {} } } }
            x.x.y.z = x.x
            return x
          })(),
          null,
          '{ x: { y: { z: <Circular ..> } } }',
          { inline: true },
        ],
        [
          (() => {
            const x = { x: { y: { z: {} } } }
            x.x.y.z = x
            return x
          })(),
          null,
          '{ x: { y: { z: <Circular ...> } } }',
          { inline: true },
        ],
        [
          (() => {
            const a = { ax: {}, ay: 1 }
            const b = { bx: {}, by: 1 }
            a.ax = b
            b.bx = a
            return a
          })(),
          null,
          '{ ax: { bx: <Circular ..>, by: 1 }, ay: 1 }',
          { inline: true },
        ],
        [
          (() => {
            function foo() {}
            foo.x = foo
            return foo
          })(),
          null,
          'function foo() & { x: <Circular .> }',
          { inline: true },
        ],
      ],
    },
    {
      name: 'arrays',
      testCases: [
        [[], null, '[]'],
        [[1, 2, 'asd', { x: 1, y: 2 }], null, '[\n  1\n  2\n  "asd"\n  {\n    x: 1\n    y: 2\n  }\n]'],
        [[1, 2, 'asd', { x: 1, y: 2 }], null, '[1, 2, "asd", { x: 1, y: 2 }]', { inline: true }],
        [[1, 2, 'asd', { x: 1, y: 2 }], null, '[\n  1\n  2\n  "asd"\n  {\n    x: 1\n    y: 2\n  }\n]'],
        [
          (() => {
            const x = [1, 2, 3]
            ;(x as any).y = 'asd'
            ;(x as any).x = 'def'
            return x
          })(),
          null,
          '[\n  1\n  2\n  3\n  x: "def"\n  y: "asd"\n]',
        ],
        [
          (() => {
            const x = [1, 2]
            x[4] = 5
            x.length = 8
            return x
          })(),
          null,
          '[\n  1\n  2\n  <2 empty items>\n  5\n  <3 empty items>\n]',
        ],
        [new Array(5), null, '[\n  <5 empty items>\n]'],
        [
          (() => {
            const x = [1, 2]
            x[4] = 5
            ;(x as any).y = 'foo'
            ;(x as any).x = 'bar'
            return x
          })(),
          null,
          '[\n  1\n  2\n  <2 empty items>\n  5\n  x: "bar"\n  y: "foo"\n]',
        ],
      ],
    },
    {
      name: 'date',
      testCases: [
        [new Date('2005-04-02T21:37:00.000+02:00'), null, 'Date(2005-04-02T19:37:00.000Z)'],
        [
          (() => {
            const d = new Date('2005-04-02T21:37:00.000+02:00')
            ;(d as any).foo = 'bar'
            return d
          })(),
          null,
          'Date(2005-04-02T19:37:00.000Z) & {\n  foo: "bar"\n}',
        ],
      ],
    },
    {
      name: 'regexps',
      testCases: [
        [/asd/, null, '/asd/'],
        [/asd/i, null, '/asd/i'],
        [
          (() => {
            const r = /asd/
            ;(r as any).foo = 'bar'
            return r
          })(),
          null,
          '/asd/ & {\n  foo: "bar"\n}',
        ],
      ],
    },
  ]

  for (const { name, testCases } of groups) {
    describe(name, () => {
      for (const [a, b, expected, options] of testCases) {
        const flags = options ? ` [${Object.keys(options).join(' ')}]` : ''
        it(`${expected.replace(/\n/g, '\\n')}${flags}`, () => {
          const result = format(a, b, { ...DEFAULTS, ...options })
          expect(result).to.equal(expected)
        })
      }
    })
  }
})
