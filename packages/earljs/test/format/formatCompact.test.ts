/* eslint-disable symbol-description */
/* eslint-disable no-new-wrappers */
import { expect } from 'chai'

import { formatCompact } from '../../src/format/formatCompact'
import { AMatcher } from '../../src/matchers'

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
    ['0123456789a', '"0123456..."'],
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
    [new Date(0), 'Date 1970-01-01T00:00:00.000Z'],
    [Promise.resolve(1), 'Promise'],
    [new WeakMap(), 'WeakMap'],
    [new WeakSet(), 'WeakSet'],
    [/asd/i, '/asd/i'],
    [{}, '{}'],
    [{ a: 'foo' }, '{ a }'],
    [{ veryLongPropName: 'foo' }, '{ "veryLon..." }'],
    [{ x: 1, y: 1 }, '{ x, y }'],
    [{ x: 1, y: 1, z: 1 }, '{ 3 properties }'],
    [[], '[]'],
    [[1, 2], '[ length: 2 ]'],
    [new Error('foo'), 'Error { message, name }'],
    [new AMatcher(String), 'Matcher [A: String]'],
  ]

  for (const [value, expected] of testCases) {
    it(expected, () => {
      expect(formatCompact(value)).to.equal(expected)
    })
  }
})
