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

    it('fails for an object with an unmatched property', () => {
      expect(() => {
        earl({ prop: true }).toHaveSubset({ prop: false })
      }).to.throw(
        'The value { prop: true } does not have a subset of { prop: false }, but it was expected to.',
      )
    })

    it('fails for an object with multiple unmatched properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).toHaveSubset({
          prop: false,
          prop2: 'duck',
        })
      }).to.throw(
        'The value { prop: true, prop2: "string" } does not have a subset of { prop: false, prop2: "duck" }, but it was expected to.',
      )
    })

    it('fails for an object with mixed matching / unmatched properties', () => {
      expect(() => {
        earl({
          prop: true,
          prop2: 'string',
        }).toHaveSubset({
          prop: true,
          prop2: 'duck',
        })
      }).to.throw(
        'The value { prop: true, prop2: "string" } does not have a subset of { prop: true, prop2: "duck" }, but it was expected to.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for an object with exactly the given property', () => {
      expect(() => {
        earl({ prop: true }).not.toHaveSubset({ prop: true })
      }).to.throw(
        'The value { prop: true } does has a subset of { prop: true }, but it was expected not to.',
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
        'The value { prop: true, prop2: "string" } does has a subset of { prop: true, prop2: "string" }, but it was expected not to.',
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
        'The value { prop: true, prop2: "string", prop3: [] } does has a subset of { prop2: expect.a(String), prop3: expect.a(Array) }, but it was expected not to.',
      )
    })

    it('passes for an object with an unmatched property', () => {
      expect(() => {
        earl({ prop: true }).not.toHaveSubset({ prop: false })
      }).not.to.throw()
    })

    it('passes for an object with multiple unmatched properties', () => {
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
      'The value { prop: true } does not have a subset of { prop: expect.a(String) }, but it was expected to.',
    )
  })
})
