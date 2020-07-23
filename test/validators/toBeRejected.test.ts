import { expect } from 'chai'
import { spy } from 'sinon'

import { expect as earl, expect as expectEarl } from '../../src'
import { Expectation } from '../../src/Expectation'

describe('toBeRejected', () => {
  describe('with msg string', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.error('Test msg'))

      await expect(run).to.be.eventually.undefined
    })

    it('throws on msg mismatch', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.error('Dummy msg'))

      await expectEarl(run).toBeRejected(
        expectEarl.error('Expected to be rejected with "Error: Dummy msg" but got "Error: Test msg"'),
      )
    })

    it('works when negated', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.error('Dummy msg'))

      await expectEarl(run).not.toBeRejected()
    })

    it('throws when negated and msg match', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.error('Test msg'))

      await expectEarl(run).toBeRejected(
        expectEarl.error('Expected not to be rejected with "Error: Test msg" but was rejected with Error: Test msg'),
      )
    })
  })

  describe('with expect.anything()', () => {
    it('works', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).toBeRejected(earl.anything())

      await expectEarl(run).not.toBeRejected()
    })

    it('works when negated', async () => {
      const run = earl(Promise.resolve()).not.toBeRejected(earl.anything())

      await expectEarl(run).not.toBeRejected()
    })

    it('throws when shouldnt throw', async () => {
      const run = earl(Promise.reject(new Error('Test msg'))).not.toBeRejected(earl.anything())

      await expectEarl(run).toBeRejected(
        expectEarl.error('Expected not to be rejected with "[Anything]" but was rejected with Error: Test msg'),
      )
    })

    it('throws when expected not to throw but threw', async () => {
      const run = earl(Promise.resolve()).toBeRejected(earl.anything())

      await expectEarl(run).toBeRejected(expectEarl.error("Expected to be rejected but didn't"))
    })
  })

  // disabled due to a problems with async stacktraces
  describe.skip('autofix', () => {
    it('calls autofix on missing values', async () => {
      const dummyAutofix = spy()
      // const dummyAutofixEarl = mockFn<[string, any], void>();
      // dummyAutofixEarl.expectedCall
      const e = new Expectation(dummyAutofix, Promise.reject(new Error('Goodbye cruel world!')))

      await e.toBeRejected()

      expect(dummyAutofix).to.be.calledOnce
      // grrr this is ugly, I hope we will rewrite these tests to earl soon :->
      expectEarl(dummyAutofix.args[0][0]).toEqual('toBeRejected')
      expectEarl(dummyAutofix.args[0][1].message).toEqual('Goodbye cruel world!')
    })

    it('does not call autofix when expectation was provided', async () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, Promise.resolve())

      await expectEarl(e.toBeRejected(earl.anything())).toBeRejected()
      expect(dummyAutofix).not.to.be.called
    })

    it('does not call autofix when expectation wasnt provided but it didnt throw', async () => {
      const dummyAutofix = spy()
      const e = new Expectation(dummyAutofix, Promise.resolve())

      await expectEarl(e.toBeRejected()).toBeRejected(expectEarl.error("Expected to be rejected but didn't"))
      expect(dummyAutofix).not.to.be.called
    })
  })
})
