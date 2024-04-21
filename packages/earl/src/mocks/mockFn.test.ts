import { expect } from 'chai'
import { AssertTrue, IsExact } from 'conditional-type-checks'

import { expect as earl } from '../expect.js'
import { mockFn } from './mockFn.js'
import { MockFunction, MockFunctionOf } from './types/index.js'

const sum = (a: number, b: number) => a + b

describe('Mock', () => {
  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = mockFn()
      expect(fn).to.be.instanceOf(Function)
    })

    it('function throws an error when not configured', () => {
      const fn = mockFn()
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })
  })

  describe('.returns', () => {
    it('sets function return value', () => {
      const fn = mockFn().returns(3)
      expect(fn()).to.equal(3)
    })

    it('resets any existing default behavior', () => {
      const fn = mockFn()
        .throws(new Error('Boom'))
        .given(1, 2)
        .executesOnce((a, b) => a + b)
        .returnsOnce(55)
        .returns(5)

      expect(fn()).to.equal(55)
      expect(fn()).to.equal(5)
      expect(fn(1, 2)).to.equal(3)
    })
  })

  describe('.returnsOnce', () => {
    it('queues function return value', () => {
      const fn = mockFn().returnsOnce(3)
      expect(fn()).to.equal(3)
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('can queue multiple values', () => {
      const fn = mockFn().returnsOnce(3).returnsOnce(4).returnsOnce('hello')
      expect(fn()).to.equal(3)
      expect(fn()).to.equal(4)
      expect(fn()).to.equal('hello')
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('respects previous configuration', () => {
      const fn = mockFn()
        .executes((x: number) => x + 1)
        .returnsOnce(3)
      expect(fn(1)).to.equal(3)
      expect(fn(1)).to.equal(2)
    })
  })

  describe('.throws', () => {
    it('sets function to throw', () => {
      const fn = mockFn().throws(new Error('Boom'))
      expect(fn).to.throw('Boom')
    })

    it('resets any existing config', () => {
      const fn = mockFn<(a: number, b: number) => number>()
        .returns(5)
        .given(1, 2)
        .executesOnce((a, b) => a + b)
        .returnsOnce(55)
        .throws(new Error('Boom'))

      expect(fn(3, 4)).to.equal(55)
      expect(fn(1, 2)).to.equal(3)
      expect(() => fn(1, 2)).to.throw('Boom')
    })
  })

  describe('.throwsOnce', () => {
    it('queues function to throw', () => {
      const fn = mockFn().throwsOnce(new Error('Boom'))
      expect(fn).to.throw('Boom')
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('can queue multiple values', () => {
      const fn = mockFn()
        .throwsOnce(new Error('Boom'))
        .throwsOnce(new Error('Bam'))
        .throwsOnce(new TypeError('BANG'))
      expect(fn).to.throw(Error, 'Boom')
      expect(fn).to.throw(Error, 'Bam')
      expect(fn).to.throw(TypeError, 'BANG')
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('respects previous configuration', () => {
      const fn = mockFn()
        .executes((x: number) => x + 1)
        .throwsOnce(new Error('Boom'))
      expect(fn).to.throw('Boom')
      expect(fn(1)).to.equal(2)
    })
  })

  describe('.executes', () => {
    it('sets function to execute implementation', () => {
      const fn = mockFn().executes((x: number) => x + 1)
      expect(fn(4)).to.equal(5)
    })

    it('resets any existing config', () => {
      const fn = mockFn()
        .returns(3)
        .given('foo')
        .returnsOnce(5)
        .returnsOnce(55)
        .executes((x: string) => 'Hey ' + x)

      expect(fn('Marie')).to.equal(55)
      expect(fn('Marie')).to.equal('Hey Marie')
      expect(fn('foo')).to.equal(5)
    })
  })

  describe('default implementation', () => {
    it('sets function to execute implementation', () => {
      const fn = mockFn((x: number) => x + 1)
      expect(fn(4)).to.equal(5)
    })

    it('infers types correctly', () => {
      const fn = mockFn<[number, number], number>((a, b) => a + b)

      expect(fn(2, 2)).to.eq(4)
    })

    it('infers types correctly with functional generic parameter', () => {
      type Operation = (a: number, b: number) => number
      const fn = mockFn<Operation>((a, b) => a + b)

      expect(fn(2, 2)).to.eq(4)

      type _ = AssertTrue<
        IsExact<
          MockFunction<[number, number], number>,
          MockFunctionOf<Operation>
        >
      >
    })
  })

  describe('.executesOnce', () => {
    it('queues function to execute implementation', () => {
      const fn = mockFn().executesOnce((x: number) => x + 1)
      expect(fn(4)).to.equal(5)
      expect(() => fn(4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('can queue multiple values', () => {
      const fn = mockFn()
        .executesOnce((x: number) => x + 1)
        .executesOnce((x: number) => x / 2)
        .executesOnce(() => 15)
      expect(fn(4)).to.equal(5)
      expect(fn(4)).to.equal(2)
      expect(fn(4)).to.equal(15)
      expect(() => fn(4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('respects previous configuration', () => {
      const fn = mockFn()
        .executes((x: number) => x + 1)
        .executesOnce((x: number) => x / 2)
      expect(fn(4)).to.equal(2)
      expect(fn(4)).to.equal(5)
    })
  })

  describe('.resolvesTo', () => {
    it('sets function return value', async () => {
      const fn = mockFn().resolvesTo(3)
      expect(await fn()).to.equal(3)
    })

    it('is async', async () => {
      const fn = mockFn().resolvesTo(3)
      expect(fn()).to.be.instanceOf(Promise)
    })
  })

  describe('.resolvesToOnce', () => {
    it('queues function return value', async () => {
      const fn = mockFn().resolvesToOnce(3)
      expect(await fn()).to.equal(3)
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('can queue multiple values', async () => {
      const fn = mockFn()
        .resolvesToOnce(3)
        .resolvesToOnce(4)
        .resolvesToOnce('hello')
      expect(await fn()).to.equal(3)
      expect(await fn()).to.equal(4)
      expect(await fn()).to.equal('hello')
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('is async', async () => {
      const fn = mockFn().resolvesToOnce(3)
      expect(fn()).to.be.instanceOf(Promise)
    })

    it('is async when combined with resolvesTo', async () => {
      const fn = mockFn()
        .resolvesToOnce(1)
        .resolvesToOnce(2)
        .resolvesToOnce(3)
        .resolvesTo(4)

      const promise = fn()
      expect(promise).to.be.instanceOf(Promise)
      expect(await promise).to.equal(1)
    })

    it('respects previous configuration', async () => {
      const fn = mockFn()
        .executes((x: number) => x + 1)
        .resolvesToOnce(3)
      expect(await fn(1)).to.equal(3)
      expect(fn(1)).to.equal(2)
    })
  })

  describe('.rejectsWith', () => {
    it('sets function return value', async () => {
      const fn = mockFn().rejectsWith(3)
      try {
        await fn()
        expect.fail()
      } catch (e) {
        expect(e).to.eq(3)
      }
    })
  })

  describe('.rejectsWithOnce', () => {
    // note: this test should not throw unhandled rejections
    it('queues function return value', async () => {
      const fn = mockFn<[number], never>().rejectsWithOnce(
        new Error('some scary error'),
      )
      fn.given(2).rejectsWithOnce(new Error('different error'))

      try {
        await fn(1)
        expect.fail()
      } catch (e: any) {
        expect(e.message).to.eq('some scary error')
      }

      try {
        await fn(2)
        expect.fail()
      } catch (e: any) {
        expect(e.message).to.eq('different error')
      }
    })
  })

  describe('.reset', () => {
    it('resets a mock without a default implementation', () => {
      const fn = mockFn().returns(3)
      expect(fn()).to.equal(3)
      fn.reset()
      expect(() => fn()).to.throw()
    })

    it('resets a mock with a default implementation', () => {
      const fn = mockFn((a: string, b: string) => a.length + b.length).returns(
        3,
      )
      expect(fn('foo', 'bar')).to.equal(3)
      fn.reset()
      expect(fn('foo', 'bar')).to.equal(6)
    })

    it('clears mock calls', () => {
      const fn = mockFn((a: string, b: string) => {})
      fn('foo', 'bar')
      expect(fn.calls).to.deep.equal([
        { args: ['foo', 'bar'], result: { type: 'return', value: undefined } },
      ])
      fn.reset()
      expect(fn.calls).to.be.empty
    })
  })

  describe('.clear', () => {
    it('clears mock calls', () => {
      const fn = mockFn((a: string, b: string) => {})
      fn('foo', 'bar')
      expect(fn.calls).to.deep.equal([
        { args: ['foo', 'bar'], result: { type: 'return', value: undefined } },
      ])
      fn.clear()
      expect(fn.calls).to.be.empty
    })
  })

  describe('.given', () => {
    it('supports .returnsOnce', () => {
      const fn = mockFn().given(1, 2).returnsOnce(3)
      expect(fn(1, 2)).to.equal(3)
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports multiple .returnsOnce', () => {
      const fn = mockFn().given(1, 2).returnsOnce(3).given(1, 2).returnsOnce(4)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(4)
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports .throwsOnce', () => {
      const fn = mockFn().given(1, 2).throwsOnce(new Error('Boom'))
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports multiple .throwsOnce', () => {
      const fn = mockFn()
        .given(1, 2)
        .throwsOnce(new Error('Boom'))
        .given(1, 2)
        .throwsOnce(new Error('Bam'))
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(() => fn(1, 2)).to.throw('Bam')
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports .executesOnce', () => {
      const fn = mockFn()
        .given(1, 2)
        .executesOnce((a, b) => a + b)
      expect(fn(1, 2)).to.equal(3)
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports multiple .executesOnce', () => {
      const fn = mockFn<[number, number], number>()
        .given(1, 2)
        .executesOnce((a, b) => a + b)
        .given(1, 2)
        .executesOnce((a, b) => a + b * 2)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(5)
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports .resolvesToOnce', async () => {
      const fn = mockFn<[number, number], Promise<number>>()
        .given(1, 2)
        .resolvesToOnce(3)
      expect(await fn(1, 2)).to.equal(3)
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => (fn as any)()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports .rejectsWithOnce', async () => {
      const fn = mockFn().given(1, 2).rejectsWithOnce(3)
      try {
        await fn(1, 2)
        expect.fail()
      } catch (e) {
        expect(e).to.eq(3)
      }
      expect(() => fn(1, 2)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn(3, 4)).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
      expect(() => fn()).to.throw(
        'The mock function was called but no default behavior has been provided.',
      )
    })

    it('supports asymmetric matchers', () => {
      const fn = mockFn().returns(null)
      fn.given(earl.a(Number)).returnsOnce(3)
      fn.given(earl.a(String)).returnsOnce('yes')

      expect(fn(false)).to.equal(null)
      expect(fn(1)).to.equal(3)
      expect(fn('foo')).to.equal('yes')
    })

    it('is typesafe', () => {
      const fn = mockFn(sum)

      fn.given(2, 2).returnsOnce(5)
    })

    it('throws an error when no default behavior is provided', () => {
      const fn = mockFn().given(3).returnsOnce(4)
      expect(() => fn()).to.throw(
        'The mock function was called with arguments that do not match any of the parameter overrides and no default behavior has been provided.',
      )
    })
  })

  describe('.calls', () => {
    it('is empty at first', () => {
      const fn = mockFn()
      expect(fn.calls).to.deep.equal([])
    })

    it('stores a single call', () => {
      const fn = mockFn(() => undefined)
      fn()
      expect(fn.calls).to.deep.equal([
        { args: [], result: { type: 'return', value: undefined } },
      ])
    })

    it('stores multiple calls', () => {
      const fn = mockFn((...args: any[]) => args.length)
      fn()
      fn(1)
      fn(5, 'yo')
      expect(fn.calls).to.deep.equal([
        { args: [], result: { type: 'return', value: 0 } },
        { args: [1], result: { type: 'return', value: 1 } },
        { args: [5, 'yo'], result: { type: 'return', value: 2 } },
      ])
    })

    it('respects .throws', () => {
      const error = new Error('Boom')
      const fn = mockFn().throws(error)
      try {
        fn()
      } catch {}
      expect(fn.calls).to.deep.equal([
        { args: [], result: { type: 'throw', error } },
      ])
    })

    it('respects .executes', () => {
      const error = new Error('Boom')
      const fn = mockFn().executes((x: number) => {
        if (x < 3) {
          return 3
        } else {
          throw error
        }
      })
      try {
        fn(2)
        fn(5)
      } catch {}
      expect(fn.calls).to.deep.equal([
        { args: [2], result: { type: 'return', value: 3 } },
        { args: [5], result: { type: 'throw', error } },
      ])
    })
  })

  describe('.isExhausted', () => {
    it('returns true initially', () => {
      const fn = mockFn()
      expect(fn.isExhausted()).to.equal(true)
    })

    it('returns false if there are queued calls', () => {
      const fn = mockFn().returnsOnce(3)
      expect(fn.isExhausted()).to.equal(false)
      fn()
      expect(fn.isExhausted()).to.equal(true)
    })

    it('returns false if there are queued calls with argument matching', () => {
      const fn = mockFn().given(1).returnsOnce(3)
      expect(fn.isExhausted()).to.equal(false)
      fn(1)
      expect(fn.isExhausted()).to.equal(true)
    })
  })
})
