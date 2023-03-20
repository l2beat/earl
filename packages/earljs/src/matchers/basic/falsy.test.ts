import { expect as earl } from '../../index'
import { hasTestedExample } from '../../test/hasTestedExample'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { falsy } from './falsy'

describe(falsy.name, () => {
  it('example', function () {
    // #region setup
    hasTestedExample(this)
    const expect = earl
    const dogApi = {
      getDog: (name: string) => ({ name, birthday: undefined }),
    }
    // #endregion

    const doggy = dogApi.getDog('Waffles')
    expect(doggy).toEqual({
      name: 'Waffles',
      // Waffles is a stray, we don't know the date :(
      birthday: expect.falsy(),
    })
  })

  testMatcherFormat(earl.falsy(), 'falsy()')

  testMatcher(
    falsy(),
    TEST_VALUES.filter((x) => !x),
    TEST_VALUES.filter((x) => !!x),
  )
})
