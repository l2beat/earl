import { expect } from 'chai'

import { expect as earl } from '../index'
import { toInclude } from './toInclude'

describe(toInclude.name, () => {
  class MyCollection<T> implements Iterable<T> {
    constructor(private readonly items: T[]) {}
    *[Symbol.iterator]() {
      yield* this.items
    }
  }

  describe('without .not', () => {
    describe('strings', () => {
      it('passes for a string containing the substring', () => {
        expect(() => {
          earl('i like pancakes').toInclude('pancakes')
        }).not.to.throw()
      })

      it('passes for a string containing multiple substrings', () => {
        expect(() => {
          earl('i like pancakes').toInclude('pancakes', 'like')
        }).not.to.throw()
      })

      it('fails for a string not containing the substring', () => {
        expect(() => {
          earl('i like pancakes').toInclude('waffles')
        }).to.throw('"i like pancakes" doesn\'t include "waffles"')
      })

      it('fails for a string containing some of the substrings', () => {
        expect(() => {
          earl('i like pancakes').toInclude('waffles', 'pancakes')
        }).to.throw(
          '"i like pancakes" doesn\'t include all of: "waffles" and "pancakes"',
        )
      })
    })

    describe('arrays', () => {
      it('passes for an array containing the element', () => {
        expect(() => {
          earl([1, 2, 3]).toInclude(2)
        }).not.to.throw()
      })

      it('passes for an array containing multiple elements', () => {
        expect(() => {
          earl([1, 2, 3]).toInclude(2, 3)
        }).not.to.throw()
      })

      it('fails for an array not containing the element', () => {
        expect(() => {
          earl([1, 2, 3]).toInclude(4)
        }).to.throw("[1, 2, 3] doesn't include 4")
      })

      it('fails for an array containing some of the elements', () => {
        expect(() => {
          earl([1, 2, 3]).toInclude(2, 4, 5)
        }).to.throw("[1, 2, 3] doesn't include all of: 2, 4 and 5")
      })
    })

    describe('sets', () => {
      it('passes for an set containing the element', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).toInclude(2)
        }).not.to.throw()
      })

      it('passes for an set containing multiple elements', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).toInclude(2, 3)
        }).not.to.throw()
      })

      it('fails for an set not containing the element', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).toInclude(4)
        }).to.throw("Set { 1, 2, 3 } doesn't include 4")
      })

      it('fails for an set containing some of the elements', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).toInclude(2, 4, 5)
        }).to.throw("Set { 1, 2, 3 } doesn't include all of: 2, 4 and 5")
      })
    })

    describe('custom iterable', () => {
      it('passes for an iterable containing the element', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).toInclude(2)
        }).not.to.throw()
      })

      it('passes for an iterable containing multiple elements', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).toInclude(2, 3)
        }).not.to.throw()
      })

      it('fails for an iterable not containing the element', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).toInclude(4)
        }).to.throw("MyCollection { items: [1, 2, 3] } doesn't include 4")
      })

      it('fails for an iterable containing some of the elements', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).toInclude(2, 4, 5)
        }).to.throw(
          "MyCollection { items: [1, 2, 3] } doesn't include all of: 2, 4 and 5",
        )
      })
    })
  })

  describe('with .not', () => {
    describe('strings', () => {
      it('fails for a string containing the substring', () => {
        expect(() => {
          earl('i like pancakes').not.toInclude('pancakes')
        }).to.throw('"i like pancakes" includes "pancakes"')
      })

      it('fails for a string containing multiple substrings', () => {
        expect(() => {
          earl('i like pancakes').not.toInclude('pancakes', 'like')
        }).to.throw('"i like pancakes" includes all of: "pancakes" and "like"')
      })

      it('passes for a string not containing the substring', () => {
        expect(() => {
          earl('i like pancakes').not.toInclude('waffles')
        }).not.to.throw()
      })

      it('passes for a string containing some of the substrings', () => {
        expect(() => {
          earl('i like pancakes').not.toInclude('waffles', 'pancakes')
        }).not.to.throw()
      })
    })

    describe('arrays', () => {
      it('fails for an array containing the element', () => {
        expect(() => {
          earl([1, 2, 3]).not.toInclude(2)
        }).to.throw('[1, 2, 3] includes 2')
      })

      it('fails for an array containing multiple elements', () => {
        expect(() => {
          earl([1, 2, 3]).not.toInclude(2, 3)
        }).to.throw('[1, 2, 3] includes all of: 2 and 3')
      })

      it('passes for an array not containing the element', () => {
        expect(() => {
          earl([1, 2, 3]).not.toInclude(4)
        }).not.to.throw()
      })

      it('passes for an array containing some of the elements', () => {
        expect(() => {
          earl([1, 2, 3]).not.toInclude(2, 4, 5)
        }).not.to.throw()
      })
    })

    describe('sets', () => {
      it('fails for an set containing the element', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).not.toInclude(2)
        }).to.throw('Set { 1, 2, 3 } includes 2')
      })

      it('fails for an set containing multiple elements', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).not.toInclude(2, 3)
        }).to.throw('Set { 1, 2, 3 } includes all of: 2 and 3')
      })

      it('passes for an set not containing the element', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).not.toInclude(4)
        }).not.to.throw()
      })

      it('passes for an set containing some of the elements', () => {
        expect(() => {
          earl(new Set([1, 2, 3])).not.toInclude(2, 4, 5)
        }).not.to.throw()
      })
    })

    describe('custom iterable', () => {
      it('fails for an iterable containing the element', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).not.toInclude(2)
        }).to.throw('MyCollection { items: [1, 2, 3] } includes 2')
      })

      it('fails for an iterable containing multiple elements', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).not.toInclude(2, 3)
        }).to.throw(
          'MyCollection { items: [1, 2, 3] } includes all of: 2 and 3',
        )
      })

      it('passes for an iterable not containing the element', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).not.toInclude(4)
        }).not.to.throw()
      })

      it('passes for an iterable containing some of the elements', () => {
        expect(() => {
          earl(new MyCollection([1, 2, 3])).not.toInclude(2, 4, 5)
        }).not.to.throw()
      })
    })
  })
})
