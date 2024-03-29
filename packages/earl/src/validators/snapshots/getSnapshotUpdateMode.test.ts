import { expect } from 'chai'

import { getSnapshotUpdateMode } from './getSnapshotUpdateMode.js'

describe(getSnapshotUpdateMode.name, () => {
  it('should throw on CI when requesting snapshot update', () => {
    expect(() =>
      getSnapshotUpdateMode({ CI: 'true', UPDATE_SNAPSHOTS: 'true' }),
    ).to.throw(
      "Both CI and UPDATE_SNAPSHOTS are set, however they can't be used together as updating snapshots on the CI is not permitted.",
    )
  })

  it('should update none snapshots on CI', () => {
    expect(getSnapshotUpdateMode({ CI: 'true' })).to.eq('none')
    expect(getSnapshotUpdateMode({ CI: 'yes' })).to.eq('none')
    expect(getSnapshotUpdateMode({ CI: '1' })).to.eq('none')

    expect(getSnapshotUpdateMode({ CI: 'false' })).to.eq('new')
    expect(getSnapshotUpdateMode({ CI: 'no' })).to.eq('new')
    expect(getSnapshotUpdateMode({ CI: '0' })).to.eq('new')
  })

  it('should update all snapshots when requested', () => {
    expect(getSnapshotUpdateMode({ UPDATE_SNAPSHOTS: 'true' })).to.eq('all')
    expect(getSnapshotUpdateMode({ UPDATE_SNAPSHOTS: 'yes' })).to.eq('all')
    expect(getSnapshotUpdateMode({ UPDATE_SNAPSHOTS: '1' })).to.eq('all')
  })

  it('should update only new snapshots by default', () => {
    expect(getSnapshotUpdateMode({})).to.eq('new')
  })
})
