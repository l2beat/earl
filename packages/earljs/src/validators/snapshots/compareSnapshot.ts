import { SnapshotState, toMatchSnapshot as toMatchSnapshotJest } from 'jest-snapshot'

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

type SnapshotComparisonResult =
  | {
      success: true
    }
  | { success: false; actual: any; expected: any }

export const compareSnapshotUsingJest: CompareSnapshot = ({ actual, updateSnapshotMode, snapshotFilePath, name }) => {
  const snapshotState = new SnapshotState(snapshotFilePath, {
    updateSnapshot: updateSnapshotMode,
    getBabelTraverse: () => require('@babel/traverse').default,
    getPrettier: () => null, // @todo get prettier config
  })

  const result = toMatchSnapshotJest.bind({
    snapshotState,
    currentTestName: name,
  } as any)(actual) as any

  snapshotState.save()

  if (result.pass) {
    return { success: true }
  } else {
    return { success: false, actual: result.actual, expected: result.expected }
  }
}
