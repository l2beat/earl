import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_OBJECTS, TEST_PRIMITIVES } from '../../test/values'
import { notEmpty } from './notEmpty'

describe(notEmpty.name, () => {
  testMatcherFormat(earl.notEmpty(), 'notEmpty()')

  testMatcher(
    notEmpty(),
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
    ],
    [
      [],
      '',
      new Set(),
      new Map(),
      ...TEST_PRIMITIVES.filter((x) => typeof x !== 'string'),
      ...TEST_OBJECTS,
    ],
  )
})
