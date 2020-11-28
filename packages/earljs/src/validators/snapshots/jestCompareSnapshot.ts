import { SnapshotState, SnapshotStateType, toMatchSnapshot as toMatchSnapshotJest } from 'jest-snapshot'

import { CompareSnapshot } from './compareSnapshot'

// it is not only a optimization to cache jestSnapshotState per snapshot file but it's actually required so SnapshotState updates snapshot counter for the same test automatically
// we do very basic caching here which should be fine as tests are run file by file
let jestSnapshotState: SnapshotStateType
let jestSnapshotStateForFile: string

export const compareSnapshotUsingJest: CompareSnapshot = ({ actual, updateSnapshotMode, snapshotFilePath, name }) => {
  if (jestSnapshotStateForFile !== snapshotFilePath) {
    jestSnapshotState = new SnapshotState(snapshotFilePath, {
      updateSnapshot: updateSnapshotMode,

      // these are only required for inline mocks so we ignore them
      getBabelTraverse: undefined as any,
      getPrettier: undefined as any,
    })
    jestSnapshotStateForFile = snapshotFilePath
  }

  const result = toMatchSnapshotJest.bind({
    snapshotState: jestSnapshotState,
    currentTestName: name,
  } as any)(actual) as any

  jestSnapshotState.save()

  if (result.pass) {
    return { success: true }
  } else {
    return { success: false, actual: result.actual, expected: result.expected }
  }
}
