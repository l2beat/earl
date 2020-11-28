import { expect } from 'earljs'

describe('snapshots', () => {
  it('works', () => {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot()
  })
})
