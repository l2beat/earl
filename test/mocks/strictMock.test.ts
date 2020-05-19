import { expect } from 'chai'

import { expect as earl } from '../../src'
import { strictMockFn } from '../../src/mocks/strictMock'

describe('strictMock', () => {
  describe('behaviour', () => {
    it('works', () => {
      const mock = strictMockFn()

      mock.expectedCall(1).returns('a')
      mock.expectedCall(2).returns('b')
      mock.expectedCall(earl.a(Number)).returns('c')

      expect(mock(1)).to.be.eq('a')
      expect(mock(2)).to.be.eq('b')
      expect(mock(5)).to.be.eq('c')
      expect(() => mock(3)).to.throw('Unexpected call!')
      expect(() => earl(mock).toBeExhausted()).not.to.throw()
    })
  })
})
