import { writeFileSync } from 'fs'

import { Control } from '../../Control'
import { EarlConfigurationError } from '../../errors'
import { format, formatCompact } from '../../format'
import { getSnapshot } from './getSnapshot'
import { getSnapshotUpdateMode } from './getSnapshotUpdateMode'
import { MochaTestContext } from './MochaTestContext'

export function toMatchSnapshot(control: Control<unknown>, context: MochaTestContext) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined) {
    throw new EarlConfigurationError('No test context')
  }
  if (control.isNegated) {
    throw new EarlConfigurationError("toMatchSnapshot can't be negated")
  }
  const actual = format(control.actual, null)

  const mode = getSnapshotUpdateMode()
  const snapshot = getSnapshot(context, mode)

  if (mode === 'all' || (mode === 'new' && snapshot.expected === undefined)) {
    snapshot.content[snapshot.name] = actual
    writeFileSync(snapshot.file, JSON.stringify(snapshot.content, null, 2), 'utf8')
  } else if (snapshot.expected === undefined) {
    control.assert({
      success: false,
      reason: `No snapshot found`,
      negatedReason: '',
      actual,
      expected: undefined,
    })
  } else {
    control.assert({
      success: actual === snapshot.expected,
      reason: `${formatCompact(control.actual)} not equal to snapshot`,
      negatedReason: '',
      actual,
      expected: snapshot.expected,
    })
  }
}
