import * as z from 'zod'

import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_OBJECTS, TEST_VALUES } from '../../test/values.js'
import { schema } from './schema.js'

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
