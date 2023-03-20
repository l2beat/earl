import { expect } from 'chai'

import { expect as earl } from '../../index'
import { toBeRejectedWith } from './toBeRejectedWith'

describe(`${toBeRejectedWith.name} and toBeRejected`, () => {
  describe('without .not', () => {
    it('passes when function throws any error', async () => {
      await expect(
        earl(async () => {
          throw new Error('Some error')
        }).toBeRejected(),
      ).not.to.be.rejected
    })

    it('passes when a promise is rejected', async () => {
      await expect(earl(Promise.reject(new Error('Some error'))).toBeRejected())
        .not.to.be.rejected
    })

    it('passes when function throws an error with a matching message', async () => {
      await expect(
        earl(async () => {
          throw new Error('Some error')
        }).toBeRejectedWith('Some error'),
      ).not.to.be.rejected
    })

    it('passes when function throws an error with a matching class and message', async () => {
      await expect(
        earl(async () => {
          throw new TypeError('Some error')
        }).toBeRejectedWith(TypeError, 'Some error'),
      ).not.to.be.rejected
    })

    it('fails when function does not throw an error', async () => {
      await expect(earl(async () => {}).toBeRejected()).to.be.rejectedWith(
        'The async function call did not throw an error, but it was expected to.',
      )
    })

    it('fails when a promise is not rejected', async () => {
      await expect(
        earl(Promise.resolve(123)).toBeRejected(),
      ).to.be.rejectedWith(
        'The promise was not rejected, but it was expected to be rejected.',
      )
    })

    it('fails when function throws an error with a non-matching message', async () => {
      await expect(
        earl(async () => {
          throw new Error('Some error')
        }).toBeRejectedWith('Different error'),
      ).to.be.rejectedWith(
        'The async function call threw an error and the message did not match "Different error", but it was expected to.',
      )
    })

    it('fails when a promise is rejected with a non-matching message', async () => {
      await expect(
        earl(Promise.reject(new Error('Some error'))).toBeRejectedWith(
          'Other error',
        ),
      ).to.be.rejectedWith(
        'The promise was rejected with an error and the message did not match "Other error", but it was expected to.',
      )
    })
  })

  describe('with .not', () => {
    it('passes when function does not throw an error', async () => {
      await expect(earl(async () => {}).not.toBeRejected()).not.to.be.rejected
    })

    it('fails when function throws an error', async () => {
      await expect(
        earl(async () => {
          throw new Error('Some error')
        }).not.toBeRejected(),
      ).to.be.rejectedWith(
        'The async function call threw an error, but it was expected not to.',
      )
    })

    it('fails when function throws an error with a matching message', async () => {
      await expect(
        earl(async () => {
          throw new Error('Some error')
        }).not.toBeRejectedWith('Some error'),
      ).to.be.rejectedWith(
        'The async function call threw an error and the message matched "Some error", but it was expected not to.',
      )
    })

    it('fails when function throws an error with a matching class and message', async () => {
      await expect(
        earl(async () => {
          throw new TypeError('Some error')
        }).not.toBeRejectedWith(TypeError, 'Some error'),
      ).to.be.rejectedWith(
        'The async function call threw an error and it was an instance of TypeError with message "Some error", but it was expected not to be.',
      )
    })
  })
})
