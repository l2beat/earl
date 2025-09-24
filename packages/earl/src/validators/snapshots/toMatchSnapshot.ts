import { writeFileSync } from 'node:fs'

import type { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import {
  DEFAULT_FORMAT_OPTIONS,
  type FormatOptions,
} from '../../format/FormatOptions.js'
import { format, formatCompact } from '../../format/index.js'
import type { TestContext } from './TestContext.js'
import { formatSnapshot } from './format.js'
import { getSnapshot } from './getSnapshot.js'
import { getSnapshotUpdateMode } from './getSnapshotUpdateMode.js'

declare module '../../expect.js' {
  interface Validators<T> {
    /**
     * Asserts that a value is equal to a snapshot. The first time the assertion
     * is run, a snapshot is created. Subsequent runs will compare the value to
     * the snapshot.
     *
     * Snapshots are stored in the `.snapshot` files next to the test file.
     *
     * To update all snapshots set the `UPDATE_SNAPSHOTS` environment variable
     * to `true`.
     *
     * Because earl is independent of the test runner it needs to have some
     * information about the test context. This is provided by the `context`
     * argument. In mocha the context is the `this` object. In uvu it is the
     * context parameter.
     *
     * @param context - The test context.
     *
     * @example
     * ```ts
     * // mocha
     * it('snapshot', function () {
     *   // Important! use `function` instead of `() =>`
     *   // to have access to `this`.
     *   expect({ foo: 'bar' }).toMatchSnapshot(this)
     * })
     *
     * // uvu
     * test('snapshot', (ctx) => {
     *   expect({ foo: 'bar' }).toMatchSnapshot(ctx)
     * })
     * ```
     */
    toMatchSnapshot(context: TestContext): void
  }
}

registerValidator('toMatchSnapshot', toMatchSnapshot)

export function toMatchSnapshot(control: Control, context: TestContext) {
  if (context === undefined) {
    throw new TypeError(
      'Invalid or no test context provided to .toMatchSnapshot(context).',
    )
  }
  if (control.isNegated) {
    throw new TypeError("toMatchSnapshot cannot be used with 'not'.")
  }
  const mode = getSnapshotUpdateMode()
  const snapshot = getSnapshot(control.file, context, mode)

  const formatOptions: FormatOptions = {
    ...DEFAULT_FORMAT_OPTIONS,
    splitMultilineStrings: !hasLegacyMultilineString(snapshot.content),
  }
  const actual = format(control.actual, null, formatOptions)

  if (mode === 'all' || (mode === 'new' && snapshot.expected === undefined)) {
    snapshot.content[snapshot.name] = actual
    writeFileSync(snapshot.file, formatSnapshot(snapshot.content), 'utf8')
  } else if (snapshot.expected === undefined) {
    control.assert({
      success: false,
      reason:
        'No snapshot was found. Snapshots cannot be generated on CI. Run tests locally to generate them.',
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

function hasLegacyMultilineString(content: Record<string, string>) {
  return Object.values(content).some((value) => value.includes('\\n'))
}
