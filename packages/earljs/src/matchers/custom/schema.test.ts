import * as z from 'zod'

import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_OBJECTS, TEST_VALUES } from '../../test/values'
import { schema } from './schema'

describe(schema.name, () => {
  const Person = z.object({
    name: z.string(),
    age: z.number(),
  })

  testMatcherFormat(earl.schema(Person), 'schema(???)')

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
