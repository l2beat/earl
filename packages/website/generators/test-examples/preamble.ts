// file with common setup shared across all examples

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
