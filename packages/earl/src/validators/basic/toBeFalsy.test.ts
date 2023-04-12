import { expect } from 'chai'

import { expect as earl, formatCompact } from '../../index.js'
import { toBeFalsy } from './toBeFalsy.js'

describe(toBeFalsy.name, () => {
  const falsyValues = [null, undefined, false, 0, NaN, '']
  const truthyValues = [true, 42, 'hello', {}, [], () => {}]

  describe('without .not', () => {
    describe('with falsy values', () => {
      for (const value of falsyValues) {
        it(`passes for ${formatCompact(value)}`, () => {
          expect(() => {
            earl(value).toBeFalsy()
          }).not.to.throw()
        })
      }
    })

    describe('with truthy values', () => {
      for (const value of truthyValues) {
        const valueInline = formatCompact(value)
        it(`fails for ${valueInline}`, () => {
          expect(() => {
            earl(value).toBeFalsy()
          }).to.throw(
            `The value ${valueInline} is not falsy, but it was expected to be falsy.`,
          )
        })
      }
    })
  })

  describe('with .not', () => {
    describe('with falsy values', () => {
      for (const value of falsyValues) {
        const valueInline = formatCompact(value)
        it(`fails for ${valueInline}`, () => {
          expect(() => {
            earl(value).not.toBeFalsy()
          }).to.throw(
            `The value ${valueInline} is falsy, but it was expected not to be falsy.`,
          )
        })
      }
    })

    describe('with truthy values', () => {
      for (const value of truthyValues) {
        it(`passes for ${formatCompact(value)}`, () => {
          expect(() => {
            earl(value).not.toBeFalsy()
          }).not.to.throw()
        })
      }
    })
  })
})
