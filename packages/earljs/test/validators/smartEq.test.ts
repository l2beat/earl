/* eslint-disable @typescript-eslint/no-redeclare */
import { expect } from 'chai'
import { AssertFalse, AssertTrue, Has, IsExact } from 'conditional-type-checks'
import fc from 'fast-check'

import { AnythingMatcher } from '../../src/matchers/Anything'
import { createPlugin, SmartEqRule } from '../../src/plugins'
import { buildSmartEqResult, ExpectedEqual, loadSmartEqRules, smartEq } from '../../src/validators/smartEq'
import { arbitraries } from '../arbitraries'
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

  it('given two primitives, smartEq(a, b) succeeds only if a === b', () => {
    fc.assert(
      fc.property(
        arbitraries.primitive,
        arbitraries.primitive,
        (a, b) => (a === b) === (smartEq(a, b).result === 'success'),
      ),
    )
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

  it('given two dates, smartEq(a, b) succeeds only if their unix timestamps equal', () => {
    fc.assert(
      fc.property(fc.date(), fc.date(), (a, b) => {
        return (smartEq(a, b).result === 'success') === (a.getTime() === b.getTime())
      }),
      { examples: [[new Date(0), new Date(0)]] },
    )
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

  it('compares recursive objects #1', () => {
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

  it('compares recursive objects #2', () => {
    const a: any = { v: 1 }
    a.foo = a
    const b: any = { v: 2, foo: { v: 2, foo: { v: 2 } } }
    b.foo.foo.foo = b

    expect(smartEq(a, b)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('compares recursive objects #3 (nasty counter)', () => {
    let _value = 0

    const nastyCounter = {
      // Don't do this in your projects.
      get value() {
        return _value++
      },
    }

    expect(smartEq(nastyCounter, nastyCounter)).to.be.deep.eq({ result: 'error', reason: 'value mismatch' })
  })

  it('does not crash on infinite object', () => {
    type MagicBean = { readonly grow: string; next: MagicBean | null }
    const makeMagicBean = (): MagicBean => ({
      get grow() {
        this.next = { ...this }
        return 'ok'
      },
      next: null,
    })

    const magicBean = makeMagicBean()

    expect(smartEq(magicBean, magicBean)).to.be.deep.eq({ result: 'error', reason: 'object possibly infinite' })
    expect(smartEq(magicBean, makeMagicBean())).to.be.deep.eq({ result: 'error', reason: 'object possibly infinite' })
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

  /**
   * Based on Jest's property tests
   * @see https://github.com/facebook/jest/blob/e0b33b74b5afd738edc183858b5c34053cfc26dd/packages/expect/src/__tests__/matchers-toEqual.property.test.ts
   */
  describe('properties', () => {
    const equals = <T>(a: T, b: T) => smartEq(a, b).result === 'success'

    it('should be reflexive', () => {
      fc.assert(
        fc.property(fc.dedup(arbitraries.anything, 2), ([a, b]) => equals(a, b)),
        {},
      )
    })

    it('should be symmetric', () => {
      fc.assert(
        fc.property(
          arbitraries.anything,
          arbitraries.anything,
          (a, b) =>
            // Given:  a and b values
            // Assert: We expect `expect(a).toEqual(b)`
            //         to be equivalent to `expect(b).toEqual(a)`
            equals(a, b) === equals(b, a),
        ),
        {
          examples: [
            [0, 5e-324],
            // eslint-disable-next-line no-new-wrappers
            [new Set([false, true]), new Set([new Boolean(true), new Boolean(true)])],
          ],
        },
      )
    })
  })
})

// #region type-level tests

type _ActualTypes = [
  ExpectedEqual<number>,
  ExpectedEqual<string>,
  ExpectedEqual<undefined>,
  ExpectedEqual<1 | 2 | 3>,
  ExpectedEqual<Fruit>,
  ExpectedEqual<Banana>,
]
type _ExpectedTypes = [number, string, undefined, 1 | 2 | 3, Fruit, Banana]
type _EveryTypeCanBeEqualToItself = AssertTrue<IsExact<_ActualTypes, _ExpectedTypes>>

interface TestPlugin {
  smartEqRules: {
    applesToOranges: SmartEqRule<Apple | Orange, Apple | Orange>
    potatoToFruit: SmartEqRule<Potato, Fruit>
    ruleThatCouldPossiblyBreakEverything: SmartEqRule<any, any>
    anotherNastyRule: SmartEqRule<unknown, unknown>
  }
}

type TestPluginRules = createPlugin.SmartEqRulesOf<TestPlugin>

type _NastyRulesAreFilteredOut = AssertTrue<IsExact<keyof TestPluginRules, 'applesToOranges' | 'potatoToFruit'>>

declare module '../../src/validators/smartEq' {
  export interface SmartEqRules extends TestPluginRules {}
}

type _ApplesCanBeComparedToOranges = AssertTrue<IsExact<ExpectedEqual<Apple>, Apple | Orange>>
type _OrangesCanBeComparedToApples = AssertTrue<IsExact<ExpectedEqual<Orange>, Apple | Orange>>

type _PotatoCanBeComparedWithFruit = AssertTrue<IsExact<ExpectedEqual<Potato>, Potato | Fruit>>
type _ButAFruitCannotBeComparedWithPotato = AssertFalse<Has<ExpectedEqual<Fruit>, Potato>>

class Apple {
  // private property forces nominal typing
  #brand!: never
}
class Banana {
  #brand!: never
}
class Orange {
  #brand!: never
}
class Potato {
  #brand!: never
}

type Fruit = Apple | Banana | Orange

// #endregion type-level tests
