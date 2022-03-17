import { expect } from 'earljs'
import { suite } from 'uvu'

const test = suite('snapshots')

test('work', () => {
  expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot()
  expect('totally different thing').toMatchSnapshot()
})

test.run()
