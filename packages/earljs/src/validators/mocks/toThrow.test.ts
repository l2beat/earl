import { expect } from 'chai'

import { expect as earl } from '../../expect'
import { mockFn } from '../../mocks'

describe('toThrow', () => {
  it('should catch error from mock', () => {
    const mock = mockFn().throwsOnce(new Error('test'))

    // .toThrow must be present and legal on the type of earl(mock)
    expect(() => earl(mock).toThrow('test')).not.to.throw()
  })
})
