import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('toBeRejected', () => {
  describe('with msg string', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected('Test msg')

      await expect(run).to.be.eventually.undefined
    })

    it('throws on msg mismatch', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected('Dummy msg')

      await expect(run).to.be.eventually.rejectedWith('Expected to be rejected with "Dummy msg" but got "Test msg"')
    })

    it('works when negated', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected('Dummy msg')

      await expect(run).not.to.be.eventually.rejected
    })

    it('throws when negated and msg match', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected('Test msg')

      await expect(run).to.be.eventually.rejectedWith('Expected not to be rejected with "Test msg" but did')
    })
  })

  describe('without args', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected()

      await expect(run).not.to.be.eventually.rejected
    })

    it('works when negated', async () => {
      const run = earl(Promise.resolve()).not.toBeRejected()

      await expect(run).not.to.eventually.rejected
    })

    it('throws when shouldnt throw', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected()

      await expect(run).to.be.eventually.rejectedWith(
        'Expected not to be rejected but was rejected with Error: Test msg',
      )
    })

    it('throws when expected not to throw but threw', async () => {
      const run = earl(Promise.resolve()).toBeRejected()

      await expect(run).to.be.eventually.rejectedWith("Expected to be rejected but didn't")
    })
  })
})
