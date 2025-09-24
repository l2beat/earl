import { expect } from 'chai'

import { expect as earl } from '../index.js'
import type { FormatOptions } from './FormatOptions.js'
import { format } from './format.js'

describe('format', () => {
  const DEFAULTS: FormatOptions = {
    minusZero: false,
    uniqueNaNs: false,
    ignorePrototypes: false,
    compareErrorStack: false,
    indentSize: 2,
    inline: false,
    maxLineLength: Number.POSITIVE_INFINITY,
    skipMatcherReplacement: false,
    requireStrictEquality: false,
    splitMultilineStrings: false,
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
        [Number.NaN, null, 'NaN'],
        [Number.NaN, Number.NaN, 'NaN'],
        [Number.NaN, Number.NaN, 'NaN (different)', { uniqueNaNs: true }],
        [Number.POSITIVE_INFINITY, null, 'Infinity'],
        [Number.NEGATIVE_INFINITY, null, '-Infinity'],
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
        ['a\nb', null, '"""\na\nb\n"""', { splitMultilineStrings: true }],
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
        [() => {}, null, 'function [anonymous]()'],
        [() => {}, () => {}, 'function [anonymous]() (different)'],
        [function* foo() {}, null, 'function* foo()'],
        [function* foo() {}, function* foo() {}, 'function* foo() (different)'],
        [function* () {}, null, 'function* [anonymous]()'],
        [
          function* () {},
          function* () {},
          'function* [anonymous]() (different)',
        ],
        [async function foo() {}, null, 'async function foo()'],
        [
          async function foo() {},
          async function foo() {},
          'async function foo() (different)',
        ],
        [async () => {}, null, 'async function [anonymous]()'],
        [
          async () => {},
          async () => {},
          'async function [anonymous]() (different)',
        ],
        [async function* foo() {}, null, 'async function* foo()'],
        [
          async function* foo() {},
          async function* foo() {},
          'async function* foo() (different)',
        ],
        [async function* () {}, null, 'async function* [anonymous]()'],
        [
          async function* () {},
          async function* () {},
          'async function* [anonymous]() (different)',
        ],
        [Set.prototype.has, null, 'function has()'],
        [Set.prototype.has, Map.prototype.has, 'function has() (different)'],
        [class A {}, null, 'class A'],
        [class A {}, class A {}, 'class A (different)'],
        [class {}, null, 'class [anonymous]'],
        [class {}, class {}, 'class [anonymous] (different)'],
        [Array, null, 'function Array()'],
        [
          Object.assign(function x() {}, { a: 1 }),
          null,
          'function x() & {\n  a: 1\n}',
        ],
        [
          Object.assign(function x() {}, { a: 1 }),
          function x() {},
          'function x() (different) & {\n  a: 1\n}',
        ],
        [
          Object.assign(() => {}, { a: 1 }),
          null,
          'function [anonymous]() & {\n  a: 1\n}',
        ],
        [
          // biome-ignore lint/complexity/noStaticOnlyClass: this is a test case
          class X {
            static x = 2
          },
          null,
          'class X & {\n  x: 2\n}',
        ],
        [
          Object.assign(class {}, { a: 1 }),
          null,
          'class [anonymous] & {\n  a: 1\n}',
        ],
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
        [
          { x: 'a\nb' },
          null,
          '{\n  x: \n  """\n  a\n  b\n  """\n}',
          { splitMultilineStrings: true },
        ],
        [
          { x: 1, y: { a: 'x', b: 'y' } },
          null,
          '{\n  x: 1\n  y: {\n    a: "x"\n    b: "y"\n  }\n}',
        ],
        [
          { x: 1, y: { a: 'x', b: 'y' } },
          null,
          '{\n x: 1\n y: {\n  a: "x"\n  b: "y"\n }\n}',
          { indentSize: 1 },
        ],
        [
          { x: 1, y: { a: 'x', b: 'y' } },
          null,
          '{ x: 1, y: { a: "x", b: "y" } }',
          { inline: true },
        ],
        [new (class Foo {})(), null, 'Foo {}'],
        [new (class Foo {})(), null, 'Foo {}', { inline: true }],
        [
          new (class Vector2 {
            constructor(
              public x: number,
              public y: number,
            ) {}
          })(1, 2),
          null,
          'Vector2 {\n  x: 1\n  y: 2\n}',
        ],
        [
          new (class Vector2 {
            constructor(
              public x: number,
              public y: number,
            ) {}
          })(1, 2),
          new (class Vector2 {
            constructor(
              public x: number,
              public y: number,
            ) {}
          })(1, 2),
          'Vector2 (different prototype) {\n  x: 1\n  y: 2\n}',
        ],
        [
          new (class Vector2 {
            constructor(
              public x: number,
              public y: number,
            ) {}
          })(1, 2),
          null,
          '{\n  x: 1\n  y: 2\n}',
          { ignorePrototypes: true },
        ],
        [
          { x: 1 },
          {},
          '(different) {\n  x: 1\n}',
          { requireStrictEquality: true },
        ],
        [
          Object.assign(Object.create({}), { constructor: undefined }),
          null,
          '[custom prototype] {\n  constructor: undefined\n}',
        ],
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
        [
          [1, 2, 'asd', { x: 1, y: 2 }],
          null,
          '[\n  1\n  2\n  "asd"\n  {\n    x: 1\n    y: 2\n  }\n]',
        ],
        [
          [1, 2, 'asd', { x: 1, y: 2 }],
          null,
          '[1, 2, "asd", { x: 1, y: 2 }]',
          { inline: true },
        ],
        [
          [1, 2, 'asd', { x: 1, y: 2 }],
          null,
          '[\n  1\n  2\n  "asd"\n  {\n    x: 1\n    y: 2\n  }\n]',
        ],
        [
          ['a', 'b', 'a\nb', 'c'],
          null,
          '[\n  "a"\n  "b"\n  """\n  a\n  b\n  """\n  "c"\n]',
          { splitMultilineStrings: true },
        ],
        [
          Object.assign([1, 2, 3], { y: 'foo', x: 'bar' }),
          null,
          '[\n  1\n  2\n  3\n  x: "bar"\n  y: "foo"\n]',
        ],
        [
          Object.assign([1, 2], { 3: 4 }),
          null,
          '[\n  1\n  2\n  <empty>\n  4\n]',
        ],
        [
          Object.assign([1, 2], { 4: 5 }, { length: 8 }),
          null,
          '[\n  1\n  2\n  <2 empty items>\n  5\n  <3 empty items>\n]',
        ],
        [new Array(5), null, '[\n  <5 empty items>\n]'],
        [
          Object.assign([1, 2], { 4: 5 }, { y: 'foo', x: 'bar' }),
          null,
          '[\n  1\n  2\n  <2 empty items>\n  5\n  x: "bar"\n  y: "foo"\n]',
        ],
        [
          class MyArray extends Array {}.from([1, 2]),
          null,
          'MyArray [\n  1\n  2\n]',
        ],
        [class MyArray extends Array {}.from([]), null, 'MyArray []'],
        [
          class MyArray extends Array {}.from([1, 2]),
          class MyArray extends Array {}.from([1, 2]),
          'MyArray (different prototype) [\n  1\n  2\n]',
        ],
        [
          class MyArray extends Array {}.from([1, 2]),
          null,
          '[\n  1\n  2\n]',
          { ignorePrototypes: true },
        ],
      ],
    },
    {
      name: 'date',
      testCases: [
        [new Date('2005-04-02'), null, 'Date 2005-04-02'],
        [
          new Date('2005-04-02T21:37:00.000+02:00'),
          null,
          'Date 2005-04-02T19:37:00Z',
        ],
        [
          new Date('2005-04-02T21:37:00.123+02:00'),
          null,
          'Date 2005-04-02T19:37:00.123Z',
        ],
        [
          Object.assign(new Date('2005-04-02T21:37:00.000+02:00'), {
            foo: 'bar',
          }),
          null,
          'Date 2005-04-02T19:37:00Z & {\n  foo: "bar"\n}',
        ],
        [new (class MyDate extends Date {})(0), null, 'MyDate 1970-01-01'],
        [
          new (class MyDate extends Date {})(0),
          new (class MyDate extends Date {})(0),
          'MyDate (different prototype) 1970-01-01',
        ],
        [
          new (class MyDate extends Date {})(0),
          null,
          'Date 1970-01-01',
          { ignorePrototypes: true },
        ],
      ],
    },
    {
      name: 'regexps',
      testCases: [
        [/asd/, null, '/asd/'],
        [/asd/i, null, '/asd/i'],
        [
          Object.assign(/asd/, { foo: 'bar' }),
          null,
          '/asd/ & {\n  foo: "bar"\n}',
        ],
        [
          new (class MyRegExp extends RegExp {})('foo', 'gi'),
          null,
          'MyRegExp /foo/gi',
        ],
        [
          new (class MyRegExp extends RegExp {})('foo', 'gi'),
          new (class MyRegExp extends RegExp {})('foo', 'gi'),
          'MyRegExp (different prototype) /foo/gi',
        ],
        [
          new (class MyRegExp extends RegExp {})('foo', 'gi'),
          null,
          '/foo/gi',
          { ignorePrototypes: true },
        ],
      ],
    },
    {
      name: 'primitive classes',
      testCases: [
        [new String('foo'), null, 'String "foo"'],
        [new Number(123), null, 'Number 123'],
        [new Boolean(false), null, 'Boolean false'],
        [
          Object.assign(new String('foo'), { foo: 'bar' }),
          null,
          'String "foo" & {\n  foo: "bar"\n}',
        ],
        [new (class MyString extends String {})('foo'), null, 'MyString "foo"'],
        [
          new (class MyString extends String {})('foo'),
          new (class MyString extends String {})('foo'),
          'MyString (different prototype) "foo"',
        ],
        [
          new (class MyString extends String {})('foo'),
          new (class MyString extends String {})('foo'),
          'String "foo"',
          { ignorePrototypes: true },
        ],
        [new (class MyNumber extends Number {})(123), null, 'MyNumber 123'],
        [
          new (class MyBoolean extends Boolean {})(true),
          null,
          'MyBoolean true',
        ],
      ],
    },
    {
      name: 'unique instances',
      testCases: [
        [Promise.resolve('foo'), null, 'Promise'],
        [Promise.resolve('foo'), Promise.resolve('foo'), 'Promise (different)'],
        [new WeakMap(), null, 'WeakMap'],
        [new WeakMap(), new WeakMap(), 'WeakMap (different)'],
        [new WeakSet(), null, 'WeakSet'],
        [new WeakSet(), new WeakSet(), 'WeakSet (different)'],
        [
          class MyPromise extends Promise<number> {}.resolve(1),
          null,
          'MyPromise',
        ],
        [
          class MyPromise extends Promise<number> {}.resolve(1),
          class MyPromise extends Promise<number> {}.resolve(1),
          'MyPromise (different prototype)',
        ],
        [
          class MyPromise extends Promise<number> {}.resolve(1),
          class MyPromise extends Promise<number> {}.resolve(1),
          'Promise (different)',
          { ignorePrototypes: true },
        ],
        (() => {
          class MyPromise extends Promise<number> {}
          return [
            MyPromise.resolve(1),
            MyPromise.resolve(1),
            'MyPromise (different)',
          ]
        })(),
        [
          class MyPromise extends Promise<number> {}.resolve(1),
          null,
          'Promise',
          { ignorePrototypes: true },
        ],
        [new (class MyWeakMap extends WeakMap {})(), null, 'MyWeakMap'],
        [
          new (class MyWeakMap extends WeakMap {})(),
          new (class MyWeakMap extends WeakMap {})(),
          'MyWeakMap (different prototype)',
        ],
        [
          new (class MyWeakMap extends WeakMap {})(),
          new (class MyWeakMap extends WeakMap {})(),
          'WeakMap (different)',
          { ignorePrototypes: true },
        ],
        (() => {
          class MyWeakMap extends WeakMap {}
          return [new MyWeakMap(), new MyWeakMap(), 'MyWeakMap (different)']
        })(),
        [
          new (class MyWeakMap extends WeakMap {})(),
          null,
          'WeakMap',
          { ignorePrototypes: true },
        ],
        [new (class MyWeakSet extends WeakSet {})(), null, 'MyWeakSet'],
        [
          new (class MyWeakSet extends WeakSet {})(),
          new (class MyWeakSet extends WeakSet {})(),
          'MyWeakSet (different prototype)',
        ],
        [
          new (class MyWeakSet extends WeakSet {})(),
          new (class MyWeakSet extends WeakSet {})(),
          'WeakSet (different)',
          { ignorePrototypes: true },
        ],
        (() => {
          class MyWeakSet extends WeakSet {}
          return [new MyWeakSet(), new MyWeakSet(), 'MyWeakSet (different)']
        })(),
        [
          new (class MyWeakSet extends WeakSet {})(),
          null,
          'WeakSet',
          { ignorePrototypes: true },
        ],
      ],
    },
    {
      name: 'errors',
      testCases: [
        [
          new Error('foo'),
          null,
          'Error {\n  message: "foo"\n  name: "Error"\n}',
        ],
        [
          new TypeError('foo'),
          null,
          'TypeError {\n  message: "foo"\n  name: "TypeError"\n}',
        ],
        [
          new TypeError('foo'),
          null,
          'Error {\n  message: "foo"\n  name: "TypeError"\n}',
          { ignorePrototypes: true },
        ],
        [
          new (class MyError extends Error {})('foo'),
          null,
          'MyError {\n  message: "foo"\n  name: "Error"\n}',
        ],
        [
          new (class MyError extends Error {})('foo'),
          new (class MyError extends Error {})('foo'),
          'MyError (different prototype) {\n  message: "foo"\n  name: "Error"\n}',
        ],
        [
          new (class MyError extends Error {})('foo'),
          new (class MyError extends Error {})('foo'),
          'Error {\n  message: "foo"\n  name: "Error"\n}',
          { ignorePrototypes: true },
        ],
        [
          new (class MyError extends Error {
            asd = 3
          })('foo'),
          null,
          'MyError {\n  asd: 3\n  message: "foo"\n  name: "Error"\n}',
        ],
        [
          Object.assign(new Error('foo'), { stack: 'foobar' }),
          null,
          'Error {\n  message: "foo"\n  name: "Error"\n}',
        ],
        [
          Object.assign(new Error('foo'), { stack: 'foobar' }),
          null,
          'Error {\n  message: "foo"\n  name: "Error"\n  stack: "foobar"\n}',
          { compareErrorStack: true },
        ],
      ],
    },
    {
      name: 'matchers',
      testCases: [
        [earl.a(String), 'foo', '"foo"'],
        [
          earl.a(String),
          'foo',
          'expect.a(String)',
          { skipMatcherReplacement: true },
        ],
        [earl.a(String), 123, 'expect.a(String)'],
        [earl.anything(), null, 'null'],
        [
          earl.anything(),
          null,
          'expect.anything()',
          { skipMatcherReplacement: true },
        ],
        [{ foo: earl.anything() }, {}, '{\n  foo: expect.anything()\n}'],
        [[earl.anything()], [], '[\n  expect.anything()\n]'],
        [
          { x: earl.anything() },
          (() => {
            const x = { x: { y: { z: {} } } }
            x.x.y.z = x
            return x
          })(),
          '{ x: { y: { z: <Circular ...> } } }',
          { inline: true },
        ],
        [
          [earl.anything()],
          (() => {
            const x = [[[]]]
            // biome-ignore lint/suspicious/noExplicitAny: any is required here
            ;(x as any)[0][0][0] = x
            return x
          })(),
          '[[[<Circular ...>]]]',
          { inline: true },
        ],
      ],
    },
    {
      name: 'sets',
      testCases: [
        [new Set(), null, 'Set {}'],
        [new Set([1, 2, 3]), null, 'Set {\n  1\n  2\n  3\n}'],
        [
          new Set([1, 2, 3, 4]),
          new Set([3, 2, 5]),
          'Set {\n  3\n  2\n  1\n  4\n}',
        ],
        [
          new Set([{ x: 1 }]),
          new Set([{ x: 1 }]),
          'Set {\n  (different) {\n    x: 1\n  }\n}',
        ],
        [
          new Set([{ x: { y: 1 } }]),
          new Set([{ x: { y: 1 } }]),
          'Set {\n  (different) {\n    x: {\n      y: 1\n    }\n  }\n}',
        ],
        [
          new Set([[[]]]),
          new Set([[[]]]),
          'Set {\n  (different) [\n    []\n  ]\n}',
        ],
        [
          Object.assign(new Set([1, 2]), { foo: 'bar' }),
          null,
          'Set {\n  1\n  2\n  foo: "bar"\n}',
        ],
        [
          new Set(['a\nb', 2]),
          null,
          'Set {\n  """\n  a\n  b\n  """\n  2\n}',
          { splitMultilineStrings: true },
        ],
      ],
    },
    {
      name: 'maps',
      testCases: [
        [new Map(), null, 'Map {}'],
        [new Map([[1, 'a']]), null, 'Map {\n  1 => "a"\n}'],
        [
          Object.assign(new Map([[1, 'a']]), { foo: 'bar' }),
          null,
          'Map {\n  1 => "a"\n  foo: "bar"\n}',
        ],
        [
          new Map([
            [1, 'a'],
            [2, 'b'],
          ]),
          null,
          'Map {\n  1 => "a"\n  2 => "b"\n}',
        ],
        [
          new Map([
            [1, 'a'],
            [2, 'b'],
            [3, 'c'],
            [4, 'd'],
          ]),
          new Map([
            [3, 'x'],
            [2, 'y'],
            [5, 'z'],
          ]),
          'Map {\n  3 => "c"\n  2 => "b"\n  1 => "a"\n  4 => "d"\n}',
        ],
        [new Map([['a', true]]), null, 'Map {\n  "a" => true\n}'],
        [new Map([[{}, true]]), null, 'Map {\n  {} => true\n}'],
        [
          new Map([[{}, true]]),
          new Map([[{}, true]]),
          'Map {\n  (different) {} => true\n}',
        ],
        [
          new Map([[{}, {}]]),
          new Map([[{}, {}]]),
          'Map {\n  (different) {} => {}\n}',
        ],
        [
          new Map([[1, earl.anything()]]),
          new Map([[1, {}]]),
          'Map {\n  1 => {}\n}',
        ],
        [
          new Map([[1, earl.anything()]]),
          new Map([[2, {}]]),
          'Map {\n  1 => expect.anything()\n}',
        ],
        [
          new Map([[{ x: 1 }, [2]]]),
          null,
          'Map {\n  {\n    x: 1\n  } => [\n    2\n  ]\n}',
        ],
        [
          new Map([[{ x: 1 }, [2]]]),
          null,
          'Map { { x: 1 } => [2] }',
          { inline: true },
        ],
        [
          new Map([
            [1, 'a\nb'],
            [2, 'b'],
          ]),
          null,
          'Map {\n  1 => \n  """\n  a\n  b\n  """\n  2 => "b"\n}',
          { splitMultilineStrings: true },
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
