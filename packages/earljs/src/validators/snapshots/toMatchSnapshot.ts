import { EarlConfigurationError } from '../../errors'
import { Control } from '../common'
import { CompareSnapshot, compareSnapshotUsingJest } from './compareSnapshot'
import { getSnapshotFilePath, getSnapshotFullName, ShouldUpdateSnapshots, shouldUpdateSnapshots } from './helpers'

export function toMatchSnapshot(
  ctrl: Control<any>,
  { compareSnapshot }: { compareSnapshot: CompareSnapshot; shouldUpdateSnapshots: ShouldUpdateSnapshots } = {
    compareSnapshot: compareSnapshotUsingJest,
    shouldUpdateSnapshots,
  },
): void {
  if (ctrl.isNegated) {
    throw new EarlConfigurationError("toMatchSnapshot can't be negated")
  }

  if (!ctrl.testRunnerCtx) {
    // @todo add docs url to improve error messages
    throw new EarlConfigurationError('Test runner integration is required for snapshot support')
  }

  const snapshotFilePath = getSnapshotFilePath(ctrl.testRunnerCtx.testInfo.testFilePath)
  const fullName = getSnapshotFullName(ctrl.testRunnerCtx.testInfo)

  const result = compareSnapshot({
    actual: ctrl.actual,
    name: fullName,
    snapshotFilePath: snapshotFilePath,
    shouldUpdateSnapshots: shouldUpdateSnapshots(),
  })

  if (result.success) {
    ctrl.assert({ success: true, reason: '-', negatedReason: '-' })
  } else {
    ctrl.assert({
      success: result.success,
      reason: "Snapshot doesn't match",
      negatedReason: '-',
      actual: result.actual,
      expected: result.expected,
    })
  }
}
