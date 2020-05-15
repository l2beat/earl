import { expect } from 'chai'
import { expect as earl } from '../../src'
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

    it('resets any existing config', () => {
      const fn = mockFn()
        .throws(new Error('Boom'))
        .given(1, 2).executes((a, b) => a + b)
        .returnsOnce(55)
        .returns(3)

      expect(fn()).to.equal(3)
      expect(fn(1, 2)).to.equal(3)
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

    it('resets any existing config', () => {
      const fn = mockFn()
        .returns(3)
        .given(1, 2).executes((a, b) => a + b)
        .returnsOnce(55)
        .throws(new Error('Boom'))

      expect(fn).to.throw('Boom')
      expect(() => fn(1, 2)).to.throw('Boom')
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

    it('resets any existing config', () => {
      const fn = mockFn()
        .returns(3)
        .given('foo').returns(5)
        .returnsOnce(55)
        .executes((x: string) => 'Hey ' + x)

      expect(fn('Marie')).to.equal('Hey Marie')
      expect(fn('foo')).to.equal('Hey foo')
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

  describe('.given', () => {
    it('supports .returns', () => {
      const fn = mockFn().given(1, 2).returns(3)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports .returnsOnce', () => {
      const fn = mockFn().given(1, 2).returnsOnce(3)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(undefined)
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports multiple .returnsOnce', () => {
      const fn = mockFn()
        .given(1, 2).returnsOnce(3)
        .given(1, 2).returnsOnce(4)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(4)
      expect(fn(1, 2)).to.equal(undefined)
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports .throws', () => {
      const fn = mockFn().given(1, 2).throws(new Error('Boom'))
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports .throwsOnce', () => {
      const fn = mockFn().given(1, 2).throwsOnce(new Error('Boom'))
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(fn(1, 2)).to.equal(undefined)
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports multiple .throwsOnce', () => {
      const fn = mockFn()
        .given(1, 2).throwsOnce(new Error('Boom'))
        .given(1, 2).throwsOnce(new Error('Bam'))
      expect(() => fn(1, 2)).to.throw('Boom')
      expect(() => fn(1, 2)).to.throw('Bam')
      expect(fn(1, 2)).to.equal(undefined)
      expect(fn(3, 4)).to.equal(undefined)
      expect(fn()).to.equal(undefined)
    })

    it('supports .executes', () => {
      const fn = mockFn().given(1, 2).executes((a, b) => a + b)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(3, 4)).to.equal(undefined)
    })

    it('supports .executesOnce', () => {
      const fn = mockFn().given(1, 2).executesOnce((a, b) => a + b)
      expect(fn(1, 2)).to.equal(3)
      expect(fn(1, 2)).to.equal(undefined)
      expect(fn(3, 4)).to.equal(undefined)
    })

    it('supports multiple .executesOnce', () => {
      const fn = mockFn()
        .given(1, 2).executesOnce((a, b) => a + b)
        .given(1, 2).executesOnce((a, b) => a + b * 2)
        expect(fn(1, 2)).to.equal(3)
        expect(fn(1, 2)).to.equal(5)
        expect(fn(1, 2)).to.equal(undefined)
        expect(fn(3, 4)).to.equal(undefined)
    })

    it('supports asymmetric matchers', () => {
      const fn = mockFn()
        .returns(null)
        .given(earl.a(Number)).returns(3)
        .given(earl.a(String)).returns('yes')
      
      expect(fn(false)).to.equal(null)
      expect(fn(1)).to.equal(3)
      expect(fn('foo')).to.equal('yes')
    })
  })
})
