import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import { TEST_OBJECTS, TEST_PRIMITIVES } from '../../test/values.js'
import { empty } from './empty.js'

describe(empty.name, () => {
  testMatcherFormat(earl.empty(), 'empty()')

  testMatcher(
    empty(),
    [[], '', new Set(), new Map()],
    [
      [1],
      [1, 2],
      ' ',
      'foo',
      new Set([1, 2]),
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
      ...TEST_PRIMITIVES.filter((x) => x !== ''),
      ...TEST_OBJECTS,
    ],
  )
})
