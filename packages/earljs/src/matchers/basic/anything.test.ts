import { expect as earl } from '../../index'
import { hasTestedExample } from '../../test/hasTestedExample'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { anything } from './anything'

describe(anything.name, () => {
  it('example', function () {
    // #region setup
    hasTestedExample(this)
    const expect = earl
    const findPerson = (name: string) => ({
      name,
      favoriteThing: Math.random(),
    })
    // #endregion

    const person = findPerson('John Doe')
    expect(person).toEqual({
      name: 'John Doe',
      favoriteThing: expect.anything(),
    })
  })

  testMatcherFormat(earl.anything(), 'anything()')

  testMatcher(anything(), TEST_VALUES, [])
})
