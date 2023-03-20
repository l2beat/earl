import { expect as earl } from '../../index'
import { hasTestedExample } from '../../test/hasTestedExample'
import { testMatcher, testMatcherFormat } from '../../test/matchers'
import {
  TEST_COMPLEX,
  TEST_FUNCTIONS,
  TEST_PRIMITIVES,
  TEST_VALUES,
} from '../../test/values'
import { a } from './a'

describe(a.name, () => {
  it('example', function () {
    // #region setup
    hasTestedExample(this)
    const expect = earl
    class Employee {
      constructor(public name: string, public age: number) {}
    }
    // #endregion

    // Primitives
    expect({ foo: Math.random() }).toEqual({ foo: expect.a(Number) })

    // Classes
    expect({
      employee: new Employee('John Doe', 42),
      birthday: new Date('1990-01-01'),
    }).toEqual({
      employee: expect.a(Employee),
      birthday: expect.a(Date),
    })
  })

  describe(String.name, () => {
    testMatcherFormat(earl.a(String), 'a(String)')

    testMatcher(
      a(String),
      TEST_VALUES.filter((x) => typeof x === 'string'),
      TEST_VALUES.filter((x) => typeof x !== 'string'),
    )
  })

  describe(Number.name, () => {
    testMatcherFormat(earl.a(Number), 'a(Number)')

    testMatcher(
      a(Number),
      TEST_VALUES.filter((x) => typeof x === 'number' && !Number.isNaN(x)),
      TEST_VALUES.filter((x) => typeof x !== 'number').concat(NaN),
    )
  })

  describe(Boolean.name, () => {
    testMatcherFormat(earl.a(Boolean), 'a(Boolean)')

    testMatcher(
      a(Boolean),
      [true, false],
      TEST_VALUES.filter((x) => typeof x !== 'boolean'),
    )
  })

  describe(BigInt.name, () => {
    testMatcherFormat(earl.a(BigInt), 'a(BigInt)')

    testMatcher(
      a(BigInt),
      TEST_VALUES.filter((x) => typeof x === 'bigint'),
      TEST_VALUES.filter((x) => typeof x !== 'bigint'),
    )
  })

  describe(Function.name, () => {
    testMatcherFormat(earl.a(Function), 'a(Function)')

    testMatcher(
      a(Function),
      TEST_VALUES.filter((x) => typeof x === 'function'),
      TEST_VALUES.filter((x) => typeof x !== 'function'),
    )
  })

  describe(Object.name, () => {
    testMatcherFormat(earl.a(Object), 'a(Object)')

    testMatcher(
      a(Object),
      TEST_COMPLEX.filter((x) => !TEST_FUNCTIONS.includes(x)),
      [...TEST_PRIMITIVES, ...TEST_FUNCTIONS],
    )
  })

  describe(Symbol.name, () => {
    testMatcherFormat(earl.a(Symbol), 'a(Symbol)')

    testMatcher(
      a(Symbol),
      TEST_VALUES.filter((x) => typeof x === 'symbol'),
      TEST_VALUES.filter((x) => typeof x !== 'symbol'),
    )
  })

  describe(Array.name, () => {
    testMatcherFormat(earl.a(Array), 'a(Array)')

    testMatcher(
      a(Array),
      TEST_VALUES.filter((x) => Array.isArray(x)),
      TEST_VALUES.filter((x) => !Array.isArray(x)),
    )
  })

  describe('custom class', () => {
    class Person {
      constructor(public name: string) {}
      isJohn() {
        return this.name === 'John'
      }
    }

    class Employee extends Person {
      constructor(name: string, public salary: number) {
        super(name)
      }
    }

    testMatcherFormat(earl.a(Person), 'a(Person)')

    testMatcher(
      a(Person),
      [new Person('Jane'), new Employee('Bob', 100_000)],
      [
        { name: 'Carol', isJohn: () => false },
        { name: 'Alice', isJohn: Person.prototype.isJohn },
        ...TEST_VALUES,
      ],
    )
  })
})
