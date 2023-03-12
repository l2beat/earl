import { EarlConfigurationError } from '../../errors'

export type SnapshotUpdateMode = 'none' | 'new' | 'all'

export function getSnapshotUpdateMode(env = process.env): SnapshotUpdateMode {
  if (isCI(env) && shouldUpdate(env)) {
    throw new EarlConfigurationError("Can't update snapshots on CI.")
  }

  if (isCI(env)) {
    return 'none'
  }
  if (shouldUpdate(env)) {
    return 'all'
  }

  return 'new'
}

function isCI(env: typeof process.env): boolean {
  return isTrue(env.CI)
}

function shouldUpdate(env: typeof process.env): boolean {
  return isTrue(env.UPDATE_SNAPSHOTS)
}

function isTrue(value: string | undefined): boolean {
  return value === 'true' || value === 'yes' || value === '1'
}
