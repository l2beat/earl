import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_OBJECTS, TEST_VALUES } from '../../test/values'
import { property } from './property'

describe(property.name, () => {
  describe('formatting', () => {
    testMatcherFormat(earl.property('foo'), 'property("foo")')
    testMatcherFormat(earl.property('foo', 42), 'property("foo", 42)')
  })

  describe('property("foo")', () => {
    testMatcher(
      property('foo'),
      [{ foo: 1 }, { foo: 1, bar: 'baz' }],
      [
        { bar: 'baz' },
        {},
        TEST_VALUES.filter((x) => !TEST_OBJECTS.includes(x)),
      ],
    )
  })

  describe('property("foo", 42)', () => {
    testMatcher(
      property('foo', 42),
      [{ foo: 42 }, { foo: 42, bar: 'baz' }],
      [{ foo: 1 }, { foo: false }, { bar: 'baz' }, {}],
    )
  })

  describe('property("foo", undefined)', () => {
    testMatcher(
      property('foo', undefined),
      [{ foo: undefined }, { foo: undefined, bar: 'baz' }],
      [{ foo: 1 }, { foo: false }, { bar: 'baz' }, {}],
    )
  })

  describe('property("foo", a(String))', () => {
    testMatcher(
      property('foo', earl.a(String)),
      [{ foo: 'xyz' }, { foo: 'xyz', bar: 'baz' }],
      [{ foo: 1 }, { foo: false }, {}],
    )
  })
})
