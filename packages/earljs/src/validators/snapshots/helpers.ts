import { basename, dirname, extname, join } from 'path'

import { EarlConfigurationError } from '../../errors'
import { TestInfo } from '../../test-runners'
import { UpdateSnapshotMode } from './compareSnapshot'

export type Env = typeof process.env

export type ShouldUpdateSnapshots = () => boolean
export function shouldUpdateSnapshots(env: Env): boolean {
  return env.UPDATE_SNAPSHOTS === 'true' || env.UPDATE_SNAPSHOTS === '1'
}

const SNAPSHOTS_DIR = '__snapshots__'
export function getSnapshotFilePath(testFilePath: string): string {
  const fileName = basename(testFilePath, extname(testFilePath)) + '.snap'
  return join(dirname(testFilePath), SNAPSHOTS_DIR, fileName)
}

export function getSnapshotFullName(testInfo: TestInfo): string {
  return [...testInfo.suitName, testInfo.testName].join(' ')
}

export function isCI(env: Env): boolean {
  return env.CI === 'true'
}

export function getUpdateSnapshotMode(env: Env): UpdateSnapshotMode {
  if (isCI(env) && shouldUpdateSnapshots(env)) {
    throw new EarlConfigurationError("Can't update snapshots on CI.")
  }

  if (isCI(env)) {
    return 'none'
  }
  if (shouldUpdateSnapshots(env)) {
    return 'all'
  }

  return 'new'
}
