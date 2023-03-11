import { expect } from 'earljs'

describe('snapshots', () => {
  it('work', function (this: Mocha.Context) {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(this)
    expect('totally different thing').toMatchSnapshot(this)
  })
})
