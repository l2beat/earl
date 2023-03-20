import { expect as earl } from '../../index'
import { hasTestedExample } from '../../test/hasTestedExample'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { defined } from './defined'

describe(defined.name, () => {
  it('example', async function () {
    // #region setup
    hasTestedExample(this)
    const expect = earl
    const fetchStockPrices = async (...stocks: string[]) =>
      Object.fromEntries(stocks.map((stock) => [stock, Math.random()]))
    // #endregion

    const result = await fetchStockPrices('BANANA', 'KIWI')
    expect(result).toEqual({
      BANANA: expect.defined(),
      KIWI: expect.defined(),
    })
  })

  testMatcherFormat(earl.defined(), 'defined()')

  testMatcher(
    defined(),
    TEST_VALUES.filter((x) => x !== undefined),
    [undefined],
  )
})
