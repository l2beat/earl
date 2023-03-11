import { expect } from 'chai'
import { readFileSync, writeFileSync } from 'fs'

import { expect as earl } from '../../../src'
import { format } from '../../../src/format'
import { resetSnapshotCache } from '../../../src/validators/snapshots/getSnapshot'
import { MochaTestContext } from '../../../src/validators/snapshots/TestContext'
import { toMatchSnapshot } from '../../../src/validators/snapshots/toMatchSnapshot'

describe(toMatchSnapshot.name, () => {
  let content: string
  let envCi: string | undefined
  let envUpdateSnapshots: string | undefined
  // eslint-disable-next-line no-path-concat
  const SNAPSHOT_FILE = __filename + '.snapshot'

  const mochaContext = (title: string): MochaTestContext => ({
    test: {
      file: __filename,
      fullTitle: () => title,
    },
  })

  before(() => {
    content = readFileSync(SNAPSHOT_FILE, 'utf8')
    envCi = process.env.CI
    envUpdateSnapshots = process.env.UPDATE_SNAPSHOTS
  })

  beforeEach(() => {
    process.env.CI = undefined
    process.env.UPDATE_SNAPSHOTS = undefined
  })

  afterEach(() => {
    resetSnapshotCache()
    writeFileSync(SNAPSHOT_FILE, content, 'utf8')
  })

  after(() => {
    process.env.CI = envCi
    process.env.UPDATE_SNAPSHOTS = envUpdateSnapshots
  })

  it('cannot be negated', function (this) {
    expect(() => {
      // this also tests that the argument type matches
      earl('foo').not.toMatchSnapshot(this)
    }).to.throw("Earl configuration error: toMatchSnapshot can't be negated")
  })

  it('keeps track of the counters', () => {
    process.env.CI = 'true'

    const content = {
      'foo 1': '"foo1"',
      'foo 2': '"foo2"',
      'bar 1': '"bar1"',
    }
    writeFileSync(SNAPSHOT_FILE, JSON.stringify(content), 'utf8')

    expect(() => {
      earl('foo1').toMatchSnapshot(mochaContext('foo'))
      earl('foo2').toMatchSnapshot(mochaContext('foo'))
      earl('bar1').toMatchSnapshot(mochaContext('bar'))
    }).not.to.throw()
  })

  it('handles complex objects', () => {
    process.env.CI = 'true'

    const x = { a: 1, b: true, x: null as unknown }
    x.x = x

    const content = {
      'complex 1': format(x, null),
      'complex 2': format({ ...x, x: null }, null),
    }
    writeFileSync(SNAPSHOT_FILE, JSON.stringify(content), 'utf8')

    expect(() => {
      earl(x).toMatchSnapshot(mochaContext('complex'))
    }).not.to.throw()

    expect(() => {
      earl(x).toMatchSnapshot(mochaContext('complex'))
    }).to.throw('not equal to snapshot')
  })

  describe('on CI', () => {
    beforeEach(() => {
      process.env.CI = 'true'
    })

    it('passes when snapshot matches', () => {
      expect(() => {
        earl('foo').toMatchSnapshot(mochaContext('foo'))
      }).not.to.throw()
    })

    it('fails when a snapshot does not match', () => {
      expect(() => {
        earl('baz').toMatchSnapshot(mochaContext('bar'))
      }).to.throw('"baz" not equal to snapshot')
    })

    it('fails when a value is not present in the snapshot', () => {
      expect(() => {
        earl('baz').toMatchSnapshot(mochaContext('unknown'))
      }).to.throw('No snapshot found')
    })

    it('cannot be set to update on ci', () => {
      process.env.UPDATE_SNAPSHOTS = 'true'
      expect(() => {
        earl('baz').toMatchSnapshot(mochaContext('unknown'))
      }).to.throw("Earl configuration error: Can't update snapshots on CI.")
    })
  })

  describe('locally', () => {
    it('passes when snapshot matches', () => {
      expect(() => {
        earl('foo').toMatchSnapshot(mochaContext('foo'))
      }).not.to.throw()
    })

    it('fails when a snapshot does not match', () => {
      expect(() => {
        earl('baz').toMatchSnapshot(mochaContext('bar'))
      }).to.throw('"baz" not equal to snapshot')
    })

    it('updates when a value is not present in the snapshot', () => {
      earl('baz').toMatchSnapshot(mochaContext('unknown'))
      const updatedContent = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'))
      expect(updatedContent).to.deep.equal({
        'foo 1': '"foo"',
        'bar 1': '"bar"',
        'unknown 1': '"baz"',
      })
    })
  })

  describe('when updating', () => {
    beforeEach(() => {
      process.env.UPDATE_SNAPSHOTS = 'true'
    })

    it('passes when snapshot matches', () => {
      expect(() => {
        earl('foo').toMatchSnapshot(mochaContext('foo'))
      }).not.to.throw()
    })

    it('updates when a snapshot does not match', () => {
      earl('baz').toMatchSnapshot(mochaContext('bar'))
      const updatedContent = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'))
      expect(updatedContent).to.deep.equal({
        'foo 1': '"foo"',
        'bar 1': '"baz"',
      })
    })

    it('updates when a value is not present in the snapshot', () => {
      earl('baz').toMatchSnapshot(mochaContext('unknown'))
      const updatedContent = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'))
      expect(updatedContent).to.deep.equal({
        'foo 1': '"foo"',
        'bar 1': '"bar"',
        'unknown 1': '"baz"',
      })
    })
  })
})
