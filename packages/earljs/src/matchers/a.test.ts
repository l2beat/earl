import { expect } from 'chai'

import { expect as earl } from '../index'
import { testMatcher } from '../test/matchers'
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
      ['green', ''],
      [new String('green'), 0, 1, undefined, null, 1, {}],
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
      [5, -5.2, 0, 1],
      [new Number(5), NaN, '', undefined, null, [], {}],
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
      [new Boolean(false), 0, 1, '', undefined, null, [], {}],
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

    testMatcher(a(BigInt), [BigInt(5)], [0, 1, '', undefined, null, [], {}])
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

    testMatcher(a(Function), [() => 1], [0, 1, '', undefined, null, [], {}])
  })

  describe(Object.name, () => {
    it('is correctly formatted', () => {
      expect(earl.a(Object).toString()).to.equal('a(Object)')
    })

    it('is type safe', () => {
      earl({ a: 1 }).toEqual(earl.a(Object))
      // THIS ISN'T ACTUALLY A TYPE SAFE :(
      earl('foo').not.toEqual(earl.a(Object))
    })

    testMatcher(a(Object), [[], {}, { a: 1 }], [0, 1, '', undefined, null])
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
      [Symbol(), Symbol('foo'), Symbol.for('foo'), Symbol.iterator],
      [0, 1, '', undefined, null, [], {}],
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

    testMatcher(a(Array), [[], [1, 2, 3]], [0, 1, '', undefined, null, {}])
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
        0,
        1,
        '',
        undefined,
        null,
        [],
        {},
      ],
    )
  })
})
