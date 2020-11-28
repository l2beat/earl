export type UpdateSnapshotMode =
  | 'all' // when used with UPDATE_SNAPSHOTS env
  | 'new' // default mode
  | 'none' // when running on CI

export type CompareSnapshot = (options: {
  actual: any
  updateSnapshotMode: UpdateSnapshotMode
  snapshotFilePath: string
  name: string
}) => SnapshotComparisonResult

export type SnapshotComparisonResult =
  | {
      success: true
    }
  | { success: false; actual: any; expected: any }
