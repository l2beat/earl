import { SnapshotState, toMatchSnapshot as toMatchSnapshotJest } from 'jest-snapshot'

export type CompareSnapshot = (options: {
  actual: any
  shouldUpdateSnapshots: boolean
  snapshotFilePath: string
  name: string
}) => SnapshotComparisonResult

type SnapshotComparisonResult =
  | {
      success: true
    }
  | { success: false; actual: any; expected: any }

export const compareSnapshotUsingJest: CompareSnapshot = ({
  actual,
  shouldUpdateSnapshots,
  snapshotFilePath,
  name,
}) => {
  const snapshotState = new SnapshotState(snapshotFilePath, {
    updateSnapshot: shouldUpdateSnapshots ? 'all' : 'new',
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
