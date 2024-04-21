import { describe, it } from 'node:test'
import { expect } from 'earl'

describe('snapshots', () => {
  it('work', (ctx) => {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot(ctx)
    expect('totally different thing').toMatchSnapshot(ctx)
  })
})
