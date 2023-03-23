import { expect } from 'earljs'

describe('Examples from tsdocs', () => {
  // #region setup
  class Employee {
    constructor(public name: string, public age: number) {}
  }

  const findPerson = (name: string) => ({
    name,
    favoriteThing: Math.random(),
  })

  const fetchStockPrices = async (...stocks: string[]) =>
    Object.fromEntries(stocks.map((stock) => [stock, Math.random()]))

  const dogApi = {
    getDog: (name: string) => ({ name, birthday: undefined }),
  }
  // #endregion

  describe('a', () => {
    it('should work', () => {
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
  })
})
