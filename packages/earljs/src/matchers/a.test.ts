import { testMatcher } from '../test/matchers'
import { a } from './a'

describe(a.name, () => {
  describe(String.name, () => {
    testMatcher(
      a(String),
      ['m', new String('green'), ''],
      [0, 1, undefined, null, 1, {}],
    )
  })

  describe(Number.name, () => {
    testMatcher(
      a(Number),
      [5, new Number(5), 0, 1],
      [NaN, '', undefined, null, [], {}],
    )
  })

  describe(Boolean.name, () => {
    testMatcher(
      a(Boolean),
      [true, new Boolean(false)],
      [0, 1, '', undefined, null, [], {}],
    )
  })

  describe(BigInt.name, () => {
    testMatcher(a(BigInt), [BigInt(5)], [0, 1, '', undefined, null, [], {}])
  })

  describe(Function.name, () => {
    testMatcher(a(Function), [() => {}], [0, 1, '', undefined, null, [], {}])
  })

  describe(Object.name, () => {
    testMatcher(a(Object), [[], {}, { a: 1 }], [0, 1, '', undefined, null])
  })

  describe(Symbol.name, () => {
    testMatcher(
      a(Symbol),
      [Symbol(), Symbol.for('foo'), Symbol.iterator],
      [0, 1, '', undefined, null, [], {}],
    )
  })

  describe(Array.name, () => {
    testMatcher(a(Array), [[], [1, 2, 3]], [0, 1, '', undefined, null, {}])
  })
})
