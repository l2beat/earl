import { expect } from 'chai'
import { mockFn } from '../../src/mocks/Mock'

describe.only('Mock', () => {
  describe('mockFn()', () => {
    it('creates a function', () => {
      const fn = mockFn()
      expect(fn).to.be.instanceOf(Function)
    })
  
    it('function returns undefined by default', () => {
      const fn = mockFn()
      expect(fn()).to.equal(undefined)
    })
  })

  describe('.returns', () => {
    it('sets function return value', () => {
      const fn = mockFn().returns(3)
      expect(fn()).to.equal(3)
    })
  })

  describe('.returnsOnce', () => {
    it('queues function return value', () => {
      const fn = mockFn().returnsOnce(3)
      expect(fn()).to.equal(3)
      expect(fn()).to.equal(undefined)
    })

    it('can queue multiple values', () => {
      const fn = mockFn()
        .returnsOnce(3)
        .returnsOnce(4)
        .returnsOnce('hello')
      expect(fn()).to.equal(3)
      expect(fn()).to.equal(4)
      expect(fn()).to.equal('hello')
      expect(fn()).to.equal(undefined)
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
  })

  describe('.throwsOnce', () => {
    it('queues function to throw', () => {
      const fn = mockFn().throwsOnce(new Error('Boom'))
      expect(fn).to.throw('Boom')
      expect(fn()).to.equal(undefined)
    })

    it('can queue multiple values', () => {
      const fn = mockFn()
        .throwsOnce(new Error('Boom'))
        .throwsOnce(new Error('Bam'))
        .throwsOnce(new TypeError('BANG'))
      expect(fn).to.throw(Error, 'Boom')
      expect(fn).to.throw(Error, 'Bam')
      expect(fn).to.throw(TypeError, 'BANG')
      expect(fn()).to.equal(undefined)
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
  })

  describe('.executesOnce', () => {
    it('queues function to execute implementation', () => {
      const fn = mockFn().executesOnce((x: number) => x + 1)
      expect(fn(4)).to.equal(5)
      expect(fn(4)).to.equal(undefined)
    })

    it('can queue multiple values', () => {
      const fn = mockFn()
        .executesOnce((x: number) => x + 1)
        .executesOnce((x: number) => x / 2)
        .executesOnce(() => 15)
      expect(fn(4)).to.equal(5)
      expect(fn(4)).to.equal(2)
      expect(fn(4)).to.equal(15)
      expect(fn(4)).to.equal(undefined)
    })

    it('respects previous configuration', () => {
      const fn = mockFn()
        .executes((x: number) => x + 1)
        .executesOnce((x: number) => x / 2)
      expect(fn(4)).to.equal(2)
      expect(fn(4)).to.equal(5)
    })
  })
})