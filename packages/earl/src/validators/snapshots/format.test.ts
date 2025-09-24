import { expect } from 'chai'

import { format } from '../../format/index.js'
import {
  SNAPSHOT_FORMAT_OPTIONS,
  formatSnapshot,
  parseSnapshot,
} from './format.js'

describe('formatting', () => {
  const snapshot = {
    'foo 1': '"foo"',
    'suite test 1': format({ a: 1, b: true }, null, SNAPSHOT_FORMAT_OPTIONS),
    'suite test 2': format(
      { nested: { x: 1, y: 2 } },
      null,
      SNAPSHOT_FORMAT_OPTIONS,
    ),
    'multiline string 1': format('a\nb\nc', null, SNAPSHOT_FORMAT_OPTIONS),
    'backward compatible multiline string 1': format('a\nb\nc', null),
  }
  const formatted =
    '// foo 1\n\n"foo"\n\n' +
    '// suite test 1\n\n{\n  a: 1\n  b: true\n}\n\n' +
    '// suite test 2\n\n{\n  nested: {\n    x: 1\n    y: 2\n  }\n}\n\n' +
    '// multiline string 1\n\n"""\na\nb\nc\n"""\n\n' +
    '// backward compatible multiline string 1\n\n"a\\nb\\nc"\n'

  it(formatSnapshot.name, () => {
    expect(formatSnapshot(snapshot)).to.equal(formatted)
  })

  it(parseSnapshot.name, () => {
    expect(parseSnapshot(formatted)).to.deep.equal(snapshot)
  })

  it('returns {} for empty string', () => {
    expect(parseSnapshot('')).to.deep.equal({})
  })

  it('returns {} for random data', () => {
    expect(parseSnapshot('foo\nbar')).to.deep.equal({})
  })
})
