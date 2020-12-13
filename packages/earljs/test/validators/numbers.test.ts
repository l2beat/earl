import { expect } from 'chai'

import { expect as earl } from '../../src'

describe('number matchers', () => {
  const config = {
    toBeGreaterThan: {
      message: 'greater than',
      operator: '>',
      compare: (a: number, b: number) => a > b,
    },
    toBeGreaterThanOrEqualTo: {
      message: 'greater than or equal to',
      operator: '>=',
      compare: (a: number, b: number) => a >= b,
    },
    toBeLessThan: {
      message: 'less than',
      operator: '<',
      compare: (a: number, b: number) => a < b,
    },
    toBeLessThanOrEqualTo: {
      message: 'less than or equal to',
      operator: '<=',
      compare: (a: number, b: number) => a <= b,
    },
  }
  const cases = [
    [-3, -2],
    [3, 2],
    [1, 2],
    [-1, 2],
    [100, 200],
  ]

  for (const [key, { message, compare, operator }] of Object.entries(config)) {
    const fnName = key as keyof typeof config
    describe(fnName, () => {
      for (const [a, b] of cases) {
        it(`${a} ${operator} ${b}`, () => {
          if (compare(a, b)) {
            expect(() => earl(a)[fnName](b)).not.to.throw()
          } else {
            expect(() => earl(a)[fnName](b)).to.throw(`${a} is not ${message} ${b}`)
          }
        })

        it(`${a} ${operator} ${b} (negated)`, () => {
          if (compare(a, b)) {
            expect(() => earl(a).not[fnName](b)).to.throw(`${a} is ${message} ${b}`)
          } else {
            expect(() => earl(a).not[fnName](b)).not.to.throw()
          }
        })
      }
    })
  }
})
