import { expect } from 'chai'
import * as z from 'zod'

import { expect as earl } from '../../index.js'
import { toMatchSchema } from './toMatchSchema.js'

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
      }).to.throw(
        'The value { x: 1, y: "foo" } does not match the given schema, but it was expected to match.',
      )
    })
  })

  describe('with .not', () => {
    it('fails for a value that matches the schema', () => {
      expect(() => {
        earl({ x: 1, y: 2 }).not.toMatchSchema(
          z.object({ x: z.number(), y: z.number() }),
        )
      }).to.throw(
        'The value { x: 1, y: 2 } matches the given schema, but it was expected not to match.',
      )
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
