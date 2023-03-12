import { testMatcher } from '../test/matchers'
import { stringMatching } from './stringMatching'

describe(stringMatching.name, () => {
  describe('"test"', () => {
    testMatcher(
      stringMatching('test'),
      ['abc test cde', 'testtesttest'],
      ['', 'tes', 'abc-abc', undefined, 1, {}, []],
    )
  })

  describe('/^[0-9]+$/', () => {
    testMatcher(
      stringMatching(/^[0-9]+$/),
      ['0', '1', '123', '123123123'],
      ['', 'tes', '123a', undefined, 1, {}, []],
    )
  })
})
