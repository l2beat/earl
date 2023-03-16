import { expect } from 'chai'

import { expect as earl, formatCompact } from '../index'
import { toBeFalsy } from './toBeFalsy'

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
          }).to.throw(`${valueInline} isn't falsy`)
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
          }).to.throw(`${valueInline} is falsy`)
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
