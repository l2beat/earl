import { expect } from 'chai'
import sinon from 'sinon'

import { autofix } from '../../src/autofix'
import { Fs } from '../../src/autofix/fs'
import { GetCallTraceType } from '../../src/autofix/stackTrace'

const filePath = '/a.js'
const sourceA = `
const result = 2+2

expect(result).toEqual()
`
const sourceAFixed = `
const result = 2+2

expect(result).toEqual(4)
`

describe('autofix', () => {
  it('works', () => {
    const dummyFs: Fs = {
      readFile: sinon.spy(() => sourceA),
      writeFile: sinon.spy(),
    }
    const dummyCT: GetCallTraceType = sinon.spy(() => ({
      file: filePath,
      line: 3,
      column: 15,
    }))

    autofix(dummyFs, dummyCT, () => false)('toEqual', 4)

    expect(dummyFs.writeFile).to.have.been.calledWithExactly(filePath, sourceAFixed)
  })
})
