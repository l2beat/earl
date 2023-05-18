import { expect as earl } from '../../index.js'
import { testMatcher, testMatcherFormat } from '../../test/matchers.js'
import {
  TEST_COMPLEX,
  TEST_FUNCTIONS,
  TEST_PRIMITIVES,
  TEST_VALUES,
} from '../../test/values.js'
import { a } from './a.js'

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

describe(a.name, () => {
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

  describe.skip('is type safe', () => {
    it('matches with values corresponding to constructor', () => {
      earl('foo').toEqual(earl.a(String))
      earl(1).toEqual(earl.a(Number))
      earl(true).toEqual(earl.a(Boolean))
      earl(BigInt(1)).toEqual(earl.a(BigInt))
      earl(Symbol('foo')).toEqual(earl.a(Symbol))
      earl({}).toEqual(earl.a(Object))
      earl({ deep: { nested: true } }).toEqual(earl.a(Object))
      earl({ deep: { nested: true } }).toEqual({
        deep: earl.a(Object),
      })
      earl([]).toEqual(earl.a(Array))
      earl([1, 2, 3]).toEqual(earl.a(Array))
      earl(new Person('John')).toEqual(earl.a(Person))
      // @note: on type level Employee is a Person
      earl(new Person('John')).toEqual(earl.a(Employee))
    })

    it('matches does not match mistyped values', () => {
      // @ts-expect-error - type mismatch
      earl('foo').toEqual(earl.a(Number))
      // @ts-expect-error - type mismatch
      earl(1).toEqual(earl.a(String))
      // @ts-expect-error - type mismatch
      earl(true).toEqual(earl.a(String))
      // @ts-expect-error - type mismatch
      earl(BigInt(1)).toEqual(earl.a(Number))
      // @ts-expect-error - type mismatch
      earl(Symbol('foo')).toEqual(earl.a(String))
      // @note: empty object is considered an array for some reason
      earl({}).toEqual(earl.a(Array))
      // @ts-expect-error - type mismatch
      earl({ deep: { nested: true } }).toEqual(earl.a(Array))
      // @note: we loose type information when matching against Object
      earl([]).toEqual(earl.a(Object))
      earl([1, 2, 3]).toEqual(earl.a(Object))
      // @ts-expect-error - type mismatch
      earl(new Person('John')).toEqual(earl.a(String))
    })
  })
})
