import 'example-plugin'

import { expect } from 'earljs'
import { test } from 'uvu'

test('EvenNumberMatcher works', () => {
  expect(2).toEqual(expect.evenNumber())
})

test('EvenNumberMatchers is type safe', () => {
  // @ts-expect-error - type mismatch
  expect(() => expect('2').toEqual(expect.evenNumber())).toThrow(
    expect.stringMatching('"2" not equal to Matcher [EvenNumberMatcher]'),
  )
})

test('toBeEven works', () => {
  expect(2).toBeEven()
})

test('toBeEven is type safe', () => {
  // @ts-expect-error - type mismatch
  expect('foo').not.toBeEven()
})

test.run()
