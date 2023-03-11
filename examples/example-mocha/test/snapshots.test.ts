import { expect } from 'earljs'

describe('snapshots', () => {
  it('work', function () {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(this)
    expect('totally different thing').toMatchSnapshot(this)
  })
})
