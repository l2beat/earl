/* eslint-disable */
export {}
// Common setup shared across all examples

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

const flight = {
  async getPassenger(seat: string) {
    return { name: 'John Doe', seat, insurancePolicy: undefined }
  },
}

const customer = {
  async getUSContactInfo() {
    return {
      state: 'CA',
      zipCode: '12345',
      phoneNumber: '123-456-7890',
    }
  },
}

const catApi = {
  getCat(name: string) {
    return { name, mom: true, dad: true }
  },
}

// #endregion
