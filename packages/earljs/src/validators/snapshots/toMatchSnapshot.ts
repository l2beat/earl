import { EarlConfigurationError } from '../../errors'
import { Control } from '../common'
import { CompareSnapshot } from './compareSnapshot'
import { Env, getSnapshotFilePath, getSnapshotFullName, getUpdateSnapshotMode } from './helpers'
import { compareSnapshotUsingJest } from './jestCompareSnapshot'

export function toMatchSnapshot(
  ctrl: Control<any>,
  { compareSnapshot, env }: { compareSnapshot: CompareSnapshot; env: Env } = {
    compareSnapshot: compareSnapshotUsingJest,
    env: process.env,
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
    updateSnapshotMode: getUpdateSnapshotMode(env),
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
