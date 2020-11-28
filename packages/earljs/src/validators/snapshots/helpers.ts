import { basename, dirname, extname, join } from 'path'

import { TestInfo } from '../../test-runners'

export type ShouldUpdateSnapshots = () => boolean
export function shouldUpdateSnapshots(): boolean {
  return process.env.EARLJS_UPDATE_SNAPSHOTS === 'true'
}

const SNAPSHOTS_DIR = '__snapshots__'
export function getSnapshotFilePath(testFilePath: string): string {
  const fileName = basename(testFilePath, extname(testFilePath)) + '.snap'
  return join(dirname(testFilePath), SNAPSHOTS_DIR, fileName)
}

export function getSnapshotFullName(testInfo: TestInfo): string {
  return [...testInfo.suitName, testInfo.testName].join(' ')
}
