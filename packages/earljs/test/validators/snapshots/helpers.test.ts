import { expect } from 'chai'

import { TestInfo } from '../../../src/test-runners'
import { getSnapshotFilePath, getSnapshotFullName } from '../../../src/validators/snapshots/helpers'

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

    expect(filePath).to.be.eq('/tests/__snapshots__/ClassA.test.snap')
  })
})
