import { expect } from 'earljs'
import { suite, test } from 'uvu'

test('work', (ctx) => {
  expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(ctx)
  expect('totally different thing').toMatchSnapshot(ctx)
})

test.run()

const mySuite = suite('my suite')

mySuite('my test', (ctx) => {
  expect({ name: 'uvu\n// foo', awesome: true }).toMatchSnapshot(ctx)
})

mySuite.run()
