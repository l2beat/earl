import { writeFileSync } from 'fs'

import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { format, formatCompact } from '../../format'
import { formatSnapshot } from './format'
import { getSnapshot } from './getSnapshot'
import { getSnapshotUpdateMode } from './getSnapshotUpdateMode'
import { TestContext } from './TestContext'

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toMatchSnapshot(context: TestContext): R
  }
}

registerValidator('toMatchSnapshot', toMatchSnapshot)

export function toMatchSnapshot(control: Control, context: TestContext) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined) {
    throw new TypeError(
      'Invalid or no test context provided to .toMatchSnapshot(context).',
    )
  }
  if (control.isNegated) {
    throw new TypeError("toMatchSnapshot cannot be used with 'not'.")
  }
  const actual = format(control.actual, null)

  const mode = getSnapshotUpdateMode()
  const snapshot = getSnapshot(control.file, context, mode)

  if (mode === 'all' || (mode === 'new' && snapshot.expected === undefined)) {
    snapshot.content[snapshot.name] = actual
    writeFileSync(snapshot.file, formatSnapshot(snapshot.content), 'utf8')
  } else if (snapshot.expected === undefined) {
    control.assert({
      success: false,
      reason: `No snapshot was found. Snapshots cannot be generated on CI.`,
      negatedReason: '',
      actual,
      expected: undefined,
    })
  } else {
    control.assert({
      success: actual === snapshot.expected,
      reason: `${formatCompact(
        control.actual,
      )} is not equal to snapshot. Run with UPDATE_SNAPSHOTS=true to update snapshots.`,
      negatedReason: '',
      actual,
      expected: snapshot.expected,
    })
  }
}
