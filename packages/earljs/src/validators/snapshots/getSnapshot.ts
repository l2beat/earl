import { readFileSync } from 'fs'
import path from 'path'

import { EarlConfigurationError } from '../../errors'
import { SnapshotUpdateMode } from './getSnapshotUpdateMode'
import { MochaTestContext } from './MochaTestContext'

const counters = new Map<string, Map<string, number>>()
const snapshots = new Map<string, Record<string, unknown>>()

export function resetSnapshotCache() {
  counters.clear()
  snapshots.clear()
}

export function getSnapshot(context: MochaTestContext, mode: SnapshotUpdateMode) {
  const test = context.test
  if (!test) {
    throw new EarlConfigurationError('No test context')
  }

  if (!test.file) {
    throw new EarlConfigurationError('No test filename')
  }
  const file = path.join(path.dirname(test.file), path.basename(test.file) + '.snapshot')
  const testName = test.fullTitle()

  const counter = counters.get(file) || new Map<string, number>()
  counters.set(file, counter)
  const count = counter.get(testName) || 1
  counter.set(testName, count + 1)

  const name = `${testName} ${count}`

  let content = snapshots.get(file)
  if (!content || mode === 'all') {
    try {
      const parsed = JSON.parse(readFileSync(file, 'utf8'))
      if (typeof parsed === 'object' && parsed !== null) {
        content = parsed
      }
    } catch {}
  }
  content = content || {}
  snapshots.set(file, content)

  const expected = content[name]

  return {
    file,
    name,
    content,
    expected: typeof expected === 'string' ? expected : undefined,
  }
}
