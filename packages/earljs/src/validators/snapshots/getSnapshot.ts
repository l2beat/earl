import { readFileSync } from 'fs'
import path from 'path'

import { EarlConfigurationError } from '../../errors'
import { parseSnapshot } from './format'
import { SnapshotUpdateMode } from './getSnapshotUpdateMode'
import { TestContext } from './TestContext'

const counters = new Map<string, Map<string, number>>()
const snapshots = new Map<string, Record<string, string>>()

export function resetSnapshotCache() {
  counters.clear()
  snapshots.clear()
}

export function getSnapshot(
  controlFileName: string | undefined,
  context: TestContext,
  mode: SnapshotUpdateMode,
) {
  const filePath = context.test?.file ?? controlFileName
  if (!filePath) {
    throw new EarlConfigurationError('Invalid test context')
  }
  const file = path.join(
    path.dirname(filePath),
    path.basename(filePath) + '.snapshot',
  )
  const testName = getTestName(context)
  if (!testName) {
    throw new EarlConfigurationError('Invalid test context')
  }

  const counter = counters.get(file) ?? new Map<string, number>()
  counters.set(file, counter)
  const count = counter.get(testName) ?? 1
  counter.set(testName, count + 1)

  const name = `${testName} ${count}`

  let content = snapshots.get(file)
  if (!content || mode === 'all') {
    try {
      content = parseSnapshot(readFileSync(file, 'utf8'))
    } catch {}
  }
  content = content ?? {}
  snapshots.set(file, content)

  const expected = content[name]

  return {
    file,
    name,
    content,
    expected: typeof expected === 'string' ? expected : undefined,
  }
}

function getTestName(context: TestContext) {
  const name = context.test?.fullTitle()
  if (name) {
    return name
  }
  if (context.__test__ !== undefined) {
    const parts = [context.__test__]
    if (context.__suite__) {
      parts.unshift(context.__suite__)
    }
    return parts.join(' ')
  }
}
