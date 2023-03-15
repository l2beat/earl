import { expect } from 'chai'
import * as z from 'zod'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { TEST_OBJECTS, TEST_VALUES } from '../test/values'
import { schema } from './schema'

describe(schema.name, () => {
  const Person = z.object({
    name: z.string(),
    age: z.number(),
  })

  it('is correctly formatted', () => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    expect(earl.schema(Person).toString()).to.equal('schema(???)')
  })

  it('is type safe', () => {
    earl({ name: 'Bobby', age: 4 }).toEqual(earl.schema(Person))
    // @ts-expect-error - type mismatch
    earl(1).not.toEqual(earl.schema(Person))
  })

  testMatcher(
    schema(Person),
    [{ name: 'Bobby', age: 4 }],
    [
      { name: 1 },
      { x: 1, y: 2 },
      {},
      ...TEST_VALUES.filter((x) => !TEST_OBJECTS.includes(x)),
    ],
  )
})
