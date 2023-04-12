/* eslint-disable symbol-description */
/* eslint-disable no-new-wrappers */
import { expect } from 'chai'

import { expect as earl } from '../index.js'
import { formatCompact } from './formatCompact.js'

describe('formatCompact', () => {
  const testCases: [unknown, string][] = [
    [1, '1'],
    [0, '0'],
    [-0, '0'],
    [0.2, '0.2'],
    [-3, '-3'],
    [1e50, '1e+50'],
    [NaN, 'NaN'],
    [Infinity, 'Infinity'],
    [-Infinity, '-Infinity'],
    [BigInt(1), '1n'],
    [BigInt(123), '123n'],
    [BigInt(-123), '-123n'],
    [BigInt(0), '0n'],
    [BigInt(-0), '0n'],
    ['', '""'],
    ['asd', '"asd"'],
    ['0123456789', '"0123456789"'],
    ['0123456789012345678901234567890123456789', '"0123456..."'],
    [Symbol(), 'Symbol()'],
    [Symbol('asd'), 'Symbol(asd)'],
    [Symbol.for('asd'), 'Symbol.for("asd")'],
    [Symbol.iterator, 'Symbol.iterator'],
    [null, 'null'],
    [undefined, 'undefined'],
    [true, 'true'],
    [false, 'false'],
    [function () {}, 'function [anonymous]()'],
    [function foo() {}, 'function foo()'],
    [class Foo {}, 'class Foo'],
    [class {}, 'class [anonymous]'],
    [new String('foo'), 'String "foo"'],
    [new Number(123), 'Number 123'],
    [new Boolean(false), 'Boolean false'],
    [new Date(0), 'Date 1970-01-01'],
    [Promise.resolve(1), 'Promise'],
    [new WeakMap(), 'WeakMap'],
    [new WeakSet(), 'WeakSet'],
    [/asd/i, '/asd/i'],
    [{}, '{}'],
    [{ a: 'foo' }, '{ a: "foo" }'],
    [
      { a: 'this is a very long string to make it long' },
      '{ a: "this is..." }',
    ],
    [
      { veryLongPropNameThatWillSurelyBeTooLong: 'foo' },
      '{ "veryLon...": "foo" }',
    ],
    [{ x: 1, y: 1 }, '{ x: 1, y: 1 }'],
    [
      { x: 'long value long value', y: 'long value long value' },
      '{ 2 entries }',
    ],
    [{ x: 1, y: 1, z: 1 }, '{ x: 1, y: 1, z: 1 }'],
    [{ x: 'long value', y: 'long value', z: 'long value' }, '{ 3 entries }'],
    [[], '[]'],
    [[1, 2], '[1, 2]'],
    [
      ['long value long value', 'long value long value'],
      '["long va...", "long va..."]',
    ],
    [new Error('foo'), 'Error("foo")'],
    [new TypeError('foo'), 'TypeError("foo")'],
    [earl.a(String), 'expect.a(String)'],
    [earl.anything(), 'expect.anything()'],
    [[earl.anything()], '[expect.anything()]'],
    [new (class Foo {})(), 'Foo {}'],
  ]

  for (const [value, expected] of testCases) {
    it(expected, () => {
      expect(formatCompact(value)).to.equal(expected)
    })
  }
})
