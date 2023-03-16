import { expect } from 'chai'

import { expect as earl, formatCompact } from '../index'
import { toBeTruthy } from './toBeTruthy'

describe(toBeTruthy.name, () => {
  const truthyValues = [true, 42, 'hello', {}, [], () => {}]
  const falsyValues = [null, undefined, false, 0, NaN, '']

  describe('without .not', () => {
    describe('with truthy values', () => {
      for (const value of truthyValues) {
        it(`passes for ${formatCompact(value)}`, () => {
          expect(() => {
            earl(value).toBeTruthy()
          }).not.to.throw()
        })
      }
    })

    describe('with falsy values', () => {
      for (const value of falsyValues) {
        const valueInline = formatCompact(value)
        it(`fails for ${valueInline}`, () => {
          expect(() => {
            earl(value).toBeTruthy()
          }).to.throw(`${valueInline} isn't truthy`)
        })
      }
    })
  })

  describe('with .not', () => {
    describe('with truthy values', () => {
      for (const value of truthyValues) {
        const valueInline = formatCompact(value)
        it(`fails for ${valueInline}`, () => {
          expect(() => {
            earl(value).not.toBeTruthy()
          }).to.throw(`${valueInline} is truthy`)
        })
      }
    })

    describe('with falsy values', () => {
      for (const value of falsyValues) {
        it(`passes for ${formatCompact(value)}`, () => {
          expect(() => {
            earl(value).not.toBeTruthy()
          }).not.to.throw()
        })
      }
    })
  })
})
