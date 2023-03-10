import { expect } from 'earljs'

describe('snapshots', () => {
  it('work', () => {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot()
    expect('totally different thing').toMatchSnapshot()
  })
})
