import { expect } from 'chai'

import { AnythingMatcher } from '../../src/matchers/Anything'
import { buildSmartEqResult, loadSmartEqRules, smartEq } from '../../src/validators/smartEq'
import { clearModuleCache } from '../common'

describe('smartEq', () => {
  it('compares primitive values', () => {
    expect(smartEq(1, 1)).to.be.deep.eq({ result: 'success' })
    expect(smartEq('abc', 'abc')).to.be.deep.eq({ result: 'success' })
    expect(smartEq(true, true)).to.be.deep.eq({ result: 'success' })

    expect(smartEq(1, 2)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq('abc', ' def')).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(true, false)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(undefined, null)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('compares objects', () => {
    expect(smartEq({}, {})).to.be.deep.eq({ result: 'success' })
    expect(smartEq({ abc: true }, { abc: true })).to.be.deep.eq({ result: 'success' })
    expect(smartEq({ a: { b: 1 } }, { a: { b: 1 } })).to.be.deep.eq({ result: 'success' })

    expect(smartEq({}, { abc: true })).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq({ abc: true }, { abc: 'true' })).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq({ a: { b: 1, c: 1 } }, { a: { b: 1 } })).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('compares primitive values against matchers', () => {
    expect(smartEq(1, AnythingMatcher.make())).to.be.deep.eq({ result: 'success' })
    expect(smartEq('abc', AnythingMatcher.make())).to.be.deep.eq({ result: 'success' })
  })

  it('compares object values against matchers', () => {
    expect(smartEq({}, { abc: AnythingMatcher.make() })).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq({ complex: { abc: 'ced' } }, { complex: AnythingMatcher.make() })).to.be.deep.eq({
      result: 'success',
    })
    expect(smartEq({ complex: undefined }, { complex: AnythingMatcher.make() })).to.be.deep.eq({ result: 'success' })
    expect(smartEq({}, { complex: AnythingMatcher.make() })).to.be.deep.eq({
      result: 'error',
      reason: 'value mismatch',
    })
  })

  it('compares undefined', () => {
    expect(smartEq(undefined, {})).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(undefined, null)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(undefined, 0)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(undefined, '')).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(undefined, undefined)).to.be.deep.eq({ result: 'success' })
  })

  it('compares null', () => {
    expect(smartEq(null, {})).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(null, undefined)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(null, 0)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(null, '')).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(null, null)).to.be.deep.eq({ result: 'success' })
  })

  it('compares arrays', () => {
    expect(smartEq([], {})).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
    expect(smartEq([1, 2, 3], [1, 2])).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq([1, 2], [1, 2, 3])).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq([1, 2, 3], [1, 2, 3])).to.be.deep.eq({ result: 'success' })
  })

  it('compares iterables', () => {
    function makeIterable(values: any[]): IterableIterator<any> {
      return new Set(values).entries()
    }

    expect(smartEq(makeIterable([1, 2, 3]), makeIterable([1, 2, 3]))).to.be.deep.eq({ result: 'success' })
    expect(smartEq(makeIterable([1, 2, 3]), makeIterable([1, 2]))).to.be.deep.eq({
      result: 'error',
      reason: 'value mismatch',
    })
    expect(smartEq(makeIterable([]), {})).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
  })

  it('compares objects with digits', () => {
    expect(smartEq({ 0: '1', 1: '2' }, { 0: '1', 1: '2' })).to.be.deep.eq({ result: 'success' })
  })

  it('compares prototypes', () => {
    class Test {
      constructor(public readonly property: boolean) {}
    }

    expect(smartEq(new Test(true), { property: true })).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
  })

  it('compares dates', () => {
    expect(smartEq(new Date(1, 2, 3), new Date(1, 2, 3))).to.be.deep.eq({ result: 'success' })
    expect(smartEq(new Date(1, 2, 3), new Date(1, 2, 4))).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(new Date(1, 2, 3), undefined)).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
  })

  it('compares sets', () => {
    expect(smartEq(new Set([1, 2, 3]), new Set([1, 2, 3]))).to.be.deep.eq({ result: 'success' })
    expect(smartEq(new Set([1, 2, 3]), new Set([1, 2, 4]))).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(new Set([1, 2, 3]), undefined)).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
  })

  it('compares maps', () => {
    expect(
      smartEq(new Map(Object.entries({ a: '1', b: 2, c: 3 })), new Map(Object.entries({ a: '1', b: 2, c: 3 }))),
    ).to.be.deep.eq({
      result: 'success',
    })
    expect(
      smartEq(new Map(Object.entries({ a: '1', b: 2, c: 3 })), new Map(Object.entries({ a: '1', b: 2, d: 3 }))),
    ).to.be.deep.eq({
      result: 'error',
      reason: 'value mismatch',
    })
    expect(
      smartEq(new Map(Object.entries({ a: '1', b: 2, c: 3 })), new Map(Object.entries({ a: '1', b: 2, c: 6 }))),
    ).to.be.deep.eq({
      result: 'error',
      reason: 'value mismatch',
    })
    expect(
      smartEq(
        new Map(Object.entries({ a: '1', b: 2, c: 3 })),
        new Map(Object.entries({ a: '1', b: 2, c: AnythingMatcher.make() })),
      ),
    ).to.be.deep.eq({
      result: 'success',
    })
    expect(smartEq(new Map(Object.entries({ a: '1', b: 2, c: 3 })), undefined)).to.be.deep.eq({
      result: 'error',
      reason: 'prototype mismatch',
    })
  })

  it('compares symbols', () => {
    expect(smartEq(Symbol('abc'), Symbol('abc'))).to.be.deep.eq({ result: 'success' })
    expect(smartEq(Symbol('abc'), Symbol('abd'))).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
    expect(smartEq(Symbol('abc'), 'abc')).to.be.deep.eq({ result: 'error', reason: 'prototype mismatch' })
  })

  it('compares edge cases', () => {
    expect(smartEq(NaN, NaN)).to.be.deep.eq({ result: 'success' })
    expect(smartEq(-0, +0)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('compares recursive objects', () => {
    interface Node {
      prev?: Node
      next?: Node
      value: any
    }
    const node = (value: any): Node => ({ value })
    const list = (...values: any[]) =>
      values.map(node).map((node, index, nodes) => {
        node.prev = nodes[index - 1]
        node.next = nodes[index + 1]
        return node
      })[0]

    const a = list(1, 2, 3)
    const b = list(1, 2, 3)
    const c = list(4, 5)

    expect(smartEq(a, b)).to.be.deep.eq({ result: 'success' })
    expect(smartEq(a, c)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('compares recursive objects2', () => {
    const a: any = { v: 1 }
    a.foo = a
    const b: any = { v: 2, foo: { v: 2, foo: { v: 2 } } }
    b.foo.foo.foo = b

    expect(smartEq(a, b)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  describe('non-strict', () => {
    it('doesnt compare prototypes', () => {
      class Test {
        constructor(public readonly property: boolean) {}
      }

      expect(smartEq(new Test(true), { property: true }, false)).to.be.deep.eq({ result: 'success' })
    })

    it('doesnt compare prototypes with nested objects', () => {
      class Test {
        constructor(public readonly property: boolean) {}
      }

      expect(smartEq({ nested: new Test(true) }, { nested: { property: true } }, false)).to.be.deep.eq({
        result: 'success',
      })
    })
  })

  type SmartEqType = typeof smartEq
  type LoadSmartEqRulesType = typeof loadSmartEqRules
  describe('plugin', () => {
    let smartEq: SmartEqType
    let loadSmartEqRules: LoadSmartEqRulesType
    beforeEach(function () {
      this.timeout(5_000)
      clearModuleCache()
      ;({ smartEq, loadSmartEqRules } = require('../../src/validators/smartEq'))
    })

    afterEach(clearModuleCache)

    it('adds new smartEq rules', () => {
      const breakMathEqRule = (a: any, e: any) => {
        if (a === 2 && e === 2) {
          return buildSmartEqResult(false)
        }
      }
      loadSmartEqRules([breakMathEqRule])

      expect(smartEq(2, 2)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
      expect(smartEq(3, 3)).to.be.deep.eq({ result: 'success' })
    })

    it('clears cache correctly', () => {
      expect(smartEq(2, 2)).to.be.deep.eq({ result: 'success' })
    })
  })
})
