import { expect } from 'chai'

import { AMatcher } from '../../../src/matchers/A'
import { AnythingMatcher } from '../../../src/matchers/Anything'
import { replaceMatchersWithMatchedValues } from '../../../src/validators/common'

describe('replaceMatchersWithValues', () => {
  it('compares primitive values', () => {
    expect(replaceMatchersWithMatchedValues(1, 1)).to.be.eq(1)
    expect(replaceMatchersWithMatchedValues('abc', 'abc')).to.be.eq('abc')
    expect(replaceMatchersWithMatchedValues(true, true)).to.be.be.eq(true)

    expect(replaceMatchersWithMatchedValues(1, 2)).to.be.eq(2)
    expect(replaceMatchersWithMatchedValues('abc', ' def')).to.be.eq(' def')
    expect(replaceMatchersWithMatchedValues(true, false)).to.be.eq(false)
    expect(replaceMatchersWithMatchedValues(undefined, null)).to.be.eq(null)
  })

  it('compares objects', () => {
    expect(replaceMatchersWithMatchedValues({}, {})).to.be.deep.eq({})
    expect(replaceMatchersWithMatchedValues({ abc: true }, { abc: true })).to.be.deep.eq({ abc: true })
    expect(replaceMatchersWithMatchedValues({ a: { b: 1 } }, { a: { b: 1 } })).to.be.deep.eq({ a: { b: 1 } })

    expect(replaceMatchersWithMatchedValues({}, { abc: true })).to.be.deep.eq({ abc: true })
    expect(replaceMatchersWithMatchedValues({ abc: true }, { abc: 'true' })).to.be.deep.eq({ abc: 'true' })
    expect(replaceMatchersWithMatchedValues({ a: { b: 1, c: 1 } }, { a: { b: 1 } })).to.be.deep.eq({ a: { b: 1 } })
    expect(replaceMatchersWithMatchedValues(true, { a: { b: 1 } })).to.be.deep.eq({ a: { b: 1 } })
  })

  it('compares primitive values against matchers', () => {
    expect(replaceMatchersWithMatchedValues(1, AnythingMatcher.make())).to.be.deep.eq(1)
    expect(replaceMatchersWithMatchedValues('abc', AnythingMatcher.make())).to.be.deep.eq('abc')

    expect(replaceMatchersWithMatchedValues(1, AMatcher.make(String))).to.be.deep.eq('[A: String]')
  })

  it('compares object values against matchers', () => {
    expect(replaceMatchersWithMatchedValues({}, { abc: AnythingMatcher.make() })).to.be.deep.eq({
      abc: undefined,
    })
    expect(
      replaceMatchersWithMatchedValues({ complex: { abc: 'ced' } }, { complex: AnythingMatcher.make() }),
    ).to.be.deep.eq({
      complex: { abc: 'ced' },
    })
    expect(replaceMatchersWithMatchedValues({ complex: undefined }, { complex: AnythingMatcher.make() })).to.be.deep.eq(
      {
        complex: undefined,
      },
    )
  })

  it('compares undefined', () => {
    expect(replaceMatchersWithMatchedValues(undefined, {})).to.be.deep.eq({})
  })

  it('compares null', () => {
    expect(replaceMatchersWithMatchedValues(null, undefined)).to.be.deep.eq(undefined)
  })

  it('compares arrays', () => {
    expect(replaceMatchersWithMatchedValues([], {})).to.be.deep.eq({})
    expect(replaceMatchersWithMatchedValues([1, 2, 3], [1, 2])).to.be.deep.eq([1, 2])
    expect(replaceMatchersWithMatchedValues([1, 2, 3], [1, 2, 3])).to.be.deep.eq([1, 2, 3])
  })

  it('replaces in complex nested structure', () => {
    expect(
      replaceMatchersWithMatchedValues(
        [1, { deep: { nested: 'abc' } }, 3],
        [1, { deep: { nested: AMatcher.make(String) } }, 3],
      ),
    ).to.be.deep.eq([1, { deep: { nested: 'abc' } }, 3])

    expect(
      replaceMatchersWithMatchedValues(
        [1, { deep: { nested: 5 } }, 3],
        [1, { deep: { nested: AMatcher.make(String) } }, 3],
      ),
    ).to.be.deep.eq([1, { deep: { nested: '[A: String]' } }, 3])
  })
})
