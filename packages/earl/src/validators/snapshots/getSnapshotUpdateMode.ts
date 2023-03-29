export type SnapshotUpdateMode = 'none' | 'new' | 'all'

export function getSnapshotUpdateMode(env = process.env): SnapshotUpdateMode {
  if (isCI(env) && shouldUpdate(env)) {
    throw new TypeError(
      "Both CI and UPDATE_SNAPSHOTS are set, however they can't be used together as updating snapshots on the CI is not permitted.",
    )
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
