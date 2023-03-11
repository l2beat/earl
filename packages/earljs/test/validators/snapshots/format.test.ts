import { expect } from 'chai'
import { format } from '../../../src/format'
import { formatSnapshot, parseSnapshot } from '../../../src/validators/snapshots/format'

describe('formatting', () => {
  const snapshot = {
    'foo 1': '"foo"',
    'suite test 1': format({ a: 1, b: true }, null),
    'suite test 2': format({ nested: { x: 1, y: 2 } }, null),
  }
  const formatted =
    '// foo 1\n\n"foo"\n\n' +
    '// suite test 1\n\n{\n  a: 1\n  b: true\n}\n\n' +
    '// suite test 2\n\n{\n  nested: {\n    x: 1\n    y: 2\n  }\n}\n'

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
