import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
import {
  TEST_COMPLEX,
  TEST_FUNCTIONS,
  TEST_PRIMITIVES,
  TEST_VALUES,
} from '../test/values'
import { a } from './a'

describe(a.name, () => {
  describe(String.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(String).toString()).to.equal('a(String)')
    })

    it('is type safe', () => {
      earl('foo').toEqual(earl.a(String))
      // @ts-expect-error - type mismatch
      earl(1).not.toEqual(earl.a(String))
    })

    testMatcher(
      a(String),
      TEST_VALUES.filter((x) => typeof x === 'string'),
      TEST_VALUES.filter((x) => typeof x !== 'string'),
    )
  })

  describe(Number.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Number).toString()).to.equal('a(Number)')
    })

    it('is type safe', () => {
      earl(1).toEqual(earl.a(Number))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Number))
    })

    testMatcher(
      a(Number),
      TEST_VALUES.filter((x) => typeof x === 'number' && !Number.isNaN(x)),
      TEST_VALUES.filter((x) => typeof x !== 'number').concat(NaN),
    )
  })

  describe(Boolean.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Boolean).toString()).to.equal('a(Boolean)')
    })

    it('is type safe', () => {
      earl(true).toEqual(earl.a(Boolean))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Boolean))
    })

    testMatcher(
      a(Boolean),
      [true, false],
      TEST_VALUES.filter((x) => typeof x !== 'boolean'),
    )
  })

  describe(BigInt.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(BigInt).toString()).to.equal('a(BigInt)')
    })

    it('is type safe', () => {
      earl(BigInt(5)).toEqual(earl.a(BigInt))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(BigInt))
    })

    testMatcher(
      a(BigInt),
      TEST_VALUES.filter((x) => typeof x === 'bigint'),
      TEST_VALUES.filter((x) => typeof x !== 'bigint'),
    )
  })

  describe(Function.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Function).toString()).to.equal('a(Function)')
    })

    it('is type safe', () => {
      earl(() => 1).toEqual(earl.a(Function))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Function))
    })

    testMatcher(
      a(Function),
      TEST_VALUES.filter((x) => typeof x === 'function'),
      TEST_VALUES.filter((x) => typeof x !== 'function'),
    )
  })

  describe(Object.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Object).toString()).to.equal('a(Object)')
    })

    it('is type safe', () => {
      earl({ a: 1 }).toEqual(earl.a(Object))
      // THIS ISN'T ACTUALLY TYPE SAFE :(
      earl('foo').not.toEqual(earl.a(Object))
    })

    testMatcher(
      a(Object),
      TEST_COMPLEX.filter((x) => !TEST_FUNCTIONS.includes(x)),
      [...TEST_PRIMITIVES, ...TEST_FUNCTIONS],
    )
  })

  describe(Symbol.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Symbol).toString()).to.equal('a(Symbol)')
    })

    it('is type safe', () => {
      earl(Symbol('foo')).toEqual(earl.a(Symbol))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Symbol))
    })

    testMatcher(
      a(Symbol),
      TEST_VALUES.filter((x) => typeof x === 'symbol'),
      TEST_VALUES.filter((x) => typeof x !== 'symbol'),
    )
  })

  describe(Array.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Array).toString()).to.equal('a(Array)')
    })

    it('is type safe', () => {
      earl([1, 2, 3]).toEqual(earl.a(Array))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Array))
    })

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

    it('is correctly formatted', () => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      expect(earl.a(Person).toString()).to.equal('a(Person)')
    })

    it('is type safe', () => {
      earl(new Person('Jane')).toEqual(earl.a(Person))
      // @ts-expect-error - type mismatch
      earl('foo').not.toEqual(earl.a(Person))
    })

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
