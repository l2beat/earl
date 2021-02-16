import { expect } from 'chai'
import path from 'path'

import { TestInfo } from '../../../src/test-runners'
import {
  getSnapshotFilePath,
  getSnapshotFullName,
  getUpdateSnapshotMode,
} from '../../../src/validators/snapshots/helpers'

const testInfo: TestInfo = {
  suitName: ['ClassA', 'when called directly'],
  testName: 'works',
  testFilePath: '/tests/ClassA.test.ts',
}

describe('getSnapshotFullName', () => {
  it('works', () => {
    const fullName = getSnapshotFullName(testInfo)

    expect(fullName).to.be.eq('ClassA when called directly works')
  })
})

describe('getSnapshotFilePath', () => {
  it('works', () => {
    const filePath = getSnapshotFilePath(testInfo.testFilePath)
    const expected = path.normalize('/tests/__snapshots__/ClassA.test.snap')
    expect(filePath).to.be.eq(expected)
  })
})

describe('getUpdateSnapshotMode', () => {
  it('should throw on CI when requesting snapshot update', () => {
    expect(() => getUpdateSnapshotMode({ CI: 'true', UPDATE_SNAPSHOTS: 'true' })).to.throw(
      "Earl configuration error: Can't update snapshots on CI.",
    )
  })

  it('should update none snapshots on CI', () => {
    expect(getUpdateSnapshotMode({ CI: 'true' })).to.eq('none')
  })

  it('should update all snapshots when requested', () => {
    expect(getUpdateSnapshotMode({ UPDATE_SNAPSHOTS: 'true' })).to.eq('all')
  })

  it('should update only new snapshots by default', () => {
    expect(getUpdateSnapshotMode({})).to.eq('new')
  })
})
