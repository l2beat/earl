import 'example-plugin'

import { expect } from 'earljs'
import { test } from 'uvu'

test('EvenNumberMatcher works', () => {
  expect(2).toEqual(expect.evenNumber())
})

test('EvenNumberMatchers is typesafe', () => {
  // @ts-expect-error it's typesafe! this is a compile time error
  expect(() => expect('2').toEqual(expect.evenNumber())).toThrow(
    expect.stringMatching('"2" not equal to Matcher [EvenNumberMatcher]'),
  )
})

test('toBeEven works', () => {
  expect(2).toBeEven()
})

test('smartEq: was poisoned with evil comparison — 2 does not equal 2 anymore!', () => {
  expect(() => expect(2).toEqual(2)).toThrow()
})

test('smartEq: a set can is now equal to array if they contain the same elements', () => {
  expect(new Set([1, 2, 3])).toEqual([1, 2, 3])
})

test('smartEq: nested set is equal to nested array as they contain same elements', () => {
  const set = new Set([1, 2, 3])
  const array = [1, 2, 3]

  expect({ nested: set, deeplyNested: set }).toEqual({
    nested: array,
    deeplyNested: array,
  })
  expect([set, set]).toEqual([array, array])
  expect([set, [set, { woop: set }]] as const).toEqual([array, [array, { woop: array }]])
})

test.run()
