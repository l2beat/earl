import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toBeRejected', () => {
  describe('with msg string', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.error('Test msg'))

      await expect(run).to.be.eventually.undefined
    })

    it('throws on msg mismatch', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.error('Dummy msg'))

      await expect(run).to.be.eventually.rejectedWith(
        'Expected to be rejected with "Error: Dummy msg" but got "Error: Test msg"',
      )
    })

    it('works when negated', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.error('Dummy msg'))

      await expect(run).not.to.be.eventually.rejected
    })

    it('throws when negated and msg match', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.error('Test msg'))

      await expect(run).to.be.eventually.rejectedWith(
        'Expected not to be rejected with "Error: Test msg" but was rejected with Error: Test msg',
      )
    })
  })

  describe('with expect.anything()', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.anything())

      await expect(run).not.to.be.eventually.rejected
    })

    it('works when negated', async () => {
      const run = earl(Promise.resolve()).not.toBeRejected(earl.anything())

      await expect(run).not.to.eventually.rejected
    })

    it('throws when shouldnt throw', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.anything())

      await expect(run).to.be.eventually.rejectedWith(
        'Expected not to be rejected with "[Anything]" but was rejected with Error: Test msg',
      )
    })

    it('throws when expected not to throw but threw', async () => {
      const run = earl(Promise.resolve()).toBeRejected(earl.anything())

      await expect(run).to.be.eventually.rejectedWith("Expected to be rejected but didn't")
    })
  })
})
