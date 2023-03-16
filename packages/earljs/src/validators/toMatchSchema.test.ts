import { expect } from 'chai'
import * as z from 'zod'

import { expect as earl } from '../index'
import { toMatchSchema } from './toMatchSchema'

describe(toMatchSchema.name, () => {
  describe('without .not', () => {
    it('passes for a value that matches the schema', () => {
      expect(() => {
        earl({ x: 1, y: 2 }).toMatchSchema(
          z.object({ x: z.number(), y: z.number() }),
        )
      }).not.to.throw()
    })

    it('fails for a value that does not match the schema', () => {
      expect(() => {
        earl({ x: 1, y: 'foo' }).toMatchSchema(
          z.object({ x: z.number(), y: z.number() }),
        )
      }).to.throw('{ x: 1, y: "foo" } doesn\'t match the given schema')
    })
  })

  describe('with .not', () => {
    it('fails for a value that matches the schema', () => {
      expect(() => {
        earl({ x: 1, y: 2 }).not.toMatchSchema(
          z.object({ x: z.number(), y: z.number() }),
        )
      }).to.throw('{ x: 1, y: 2 } matches the given schema')
    })

    it('passes for a value that does not match the schema', () => {
      expect(() => {
        earl({ x: 1, y: 'foo' }).not.toMatchSchema(
          z.object({ x: z.number(), y: z.number() }),
        )
      }).not.to.throw()
    })
  })
})
