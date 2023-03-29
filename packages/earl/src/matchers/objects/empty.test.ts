import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_OBJECTS, TEST_PRIMITIVES } from '../../test/values'
import { empty } from './empty'

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
