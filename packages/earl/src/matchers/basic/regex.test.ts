import { expect as earl } from '../../index'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import { TEST_VALUES } from '../../test/values'
import { regex } from './regex'

describe(regex.name, () => {
  testMatcherFormat(earl.regex(/^[0-9]+$/), 'regex(/^[0-9]+$/)')

  testMatcher(
    regex(/^[0-9]+$/),
    ['0', '1', '123', '123123123'],
    ['', 'tes', '123a', ...TEST_VALUES.filter((x) => typeof x !== 'string')],
  )
})
