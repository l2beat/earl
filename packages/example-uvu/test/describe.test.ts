import { expect } from 'earljs'
import { describe } from './helpers'

describe('describe/it style tests', (it) => {
  it('works', () => {
    expect('this should work').toMatchSnapshot()
  })
})
