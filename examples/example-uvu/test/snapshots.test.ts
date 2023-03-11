import { expect } from 'earljs'
import { test } from 'uvu'

test('work', (ctx) => {
  expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(ctx)
  expect('totally different thing').toMatchSnapshot(ctx)
})

test.run()
