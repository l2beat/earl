import { expect } from 'chai'

import { expect as earl } from '../../index.js'
import { toHaveSubset } from './toHaveSubset.js'

describe(toHaveSubset.name, () => {
  describe('without .not', () => {
    it('passes for an object with exactly the given property', () => {
      expect(() => {
        earl({ prop: true }).toHaveSubset({ prop: true })
      }).not.to.throw()
    })

    it('passes for an object with exactly the given properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).toHaveSubset({
          prop: true,
          prop2: 'string',
        })
      }).not.to.throw()
    })

    it('passes for an object with more properties than given', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
          prop3: [],
        }).toHaveSubset({
          prop2: 'string',
          prop3: [],
        })
      }).not.to.throw()
    })

    it('fails for an object with an unmatching property', () => {
      expect(() => {
        earl({ prop: true }).toHaveSubset({ prop: false })
      }).to.throw('{ prop: false } is not a subset of object { prop: true }')
    })

    it('fails for an object with multiple unmatching properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).toHaveSubset({
          prop: false,
          prop2: 'duck',
        })
      }).to.throw(
        '{ prop: false, prop2: "duck" } is not a subset of object { prop: true, prop2: "string" }',
      )
    })

    it('fails for an object with mixed match/unmatching properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).toHaveSubset({
          prop: true,
          prop2: 'duck',
        })
      }).to.throw(
        '{ prop: true, prop2: "duck" } is not a subset of object { prop: true, prop2: "string" }',
      )
    })
  })

  describe('with .not', () => {
    it('fails for an object with exactly the given property', () => {
      expect(() => {
        earl({ prop: true }).not.toHaveSubset({ prop: true })
      }).to.throw(
        '{ prop: true } is a subset of object { prop: true }, but it was expected not to be',
      )
    })

    it('fails for an object with exactly the given properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).not.toHaveSubset({
          prop: true,
          prop2: 'string',
        })
      }).to.throw(
        '{ prop: true, prop2: "string" } is a subset of object { prop: true, prop2: "string" }, but it was expected not to be',
      )
    })

    it('fails for an object with more properties than given', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
          prop3: [],
        }).not.toHaveSubset({
          prop2: earl.a(String),
          prop3: earl.a(Array),
        })
      }).to.throw(
        '{ 2 entries } is a subset of object { 3 entries }, but it was expected not to be',
      )
    })

    it('passes for an object with an unmatching property', () => {
      expect(() => {
        earl({ prop: true }).not.toHaveSubset({ prop: false })
      }).not.to.throw()
    })

    it('passes for an object with multiple unmatching properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).not.toHaveSubset({
          prop: false,
          prop2: 'duck',
        })
      }).not.to.throw()
    })
  })

  it('supports matchers', () => {
    expect(() => {
      earl({ prop: true }).toHaveSubset({ prop: earl.a(Boolean) })
    }).not.to.throw()

    expect(() => {
      earl({ prop: true }).toHaveSubset({ prop: earl.a(String) })
    }).to.throw(
      '{ prop: expect.a(String) } is not a subset of object { prop: true }',
    )
  })
})
