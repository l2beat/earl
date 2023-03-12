import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import { stringMatching } from './stringMatching'

describe(stringMatching.name, () => {
  describe('"test"', () => {
    it('is correctly formatted', () => {
      expect(earl.stringMatching('test').toString()).to.equal(
        'stringMatching("test")',
      )
    })

    it('is type safe', () => {
      earl('test').toEqual(earl.stringMatching('test'))
      // @ts-expect-error - type mismatch
      earl(1).not.toEqual(earl.stringMatching('test'))
    })

    testMatcher(
      stringMatching('test'),
      ['abc test cde', 'testtesttest'],
      ['', 'tes', 'abc-abc', undefined, 1, {}, []],
    )
  })

  describe('/^[0-9]+$/', () => {
    it('is correctly formatted', () => {
      expect(earl.stringMatching(/^[0-9]+$/).toString()).to.equal(
        'stringMatching(/^[0-9]+$/)',
      )
    })

    it('is type safe', () => {
      earl('123').toEqual(earl.stringMatching(/^[0-9]+$/))
      // @ts-expect-error - type mismatch
      earl(1).not.toEqual(earl.stringMatching(/^[0-9]+$/))
    })

    testMatcher(
      stringMatching(/^[0-9]+$/),
      ['0', '1', '123', '123123123'],
      ['', 'tes', '123a', undefined, 1, {}, []],
    )
  })
})
