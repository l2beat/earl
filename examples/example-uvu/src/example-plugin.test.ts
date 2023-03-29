import 'example-plugin'

import { expect } from 'earl'
import { test } from 'uvu'

test('EvenNumberMatcher works', () => {
  expect(2).toEqual(expect.evenNumber())
})

test('EvenNumberMatchers is type safe', () => {
  // @ts-expect-error - type mismatch
  expect('2').not.toEqual(expect.evenNumber())
})

test('toBeEven works', () => {
  expect(2).toBeEven()
})

test('toBeEven is type safe', () => {
  // @ts-expect-error - type mismatch
  expect('foo').not.toBeEven()
})

test.run()
