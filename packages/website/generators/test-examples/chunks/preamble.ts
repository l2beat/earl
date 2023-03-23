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
  getDog(name: string) {
    return { name, birthday: undefined }
  },
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

class Fish {
  constructor(public species: string) {}
}
const crazyZoologist = {
  name: 'John Doe',
  pet: new Fish('shark'),
}

const people = {
  async findWhere(_condition: { friendCount: number }) {
    if (_condition.friendCount === 42) {
      return {
        name: 'John Doe',
        friends: ['not', 'empty', 'array'],
      }
    }
    return {
      name: 'John Doe',
      friends: [],
    }
  },
}

async function getLatestEvents(_: { limit: number }) {
  return [
    { pending: true },
    { finalizedAt: new Date() },
    { finalizedAt: new Date() },
  ]
}

const api = {
  async get(_path: string) {
    return {
      success: true,
      data: {
        name: 'John Doe',
        age: 42,
        alive: true,
      },
    }
  },
}

function getLatLon() {
  return {
    lat: Math.random() * 180 - 90,
    lon: Math.random() * 360 - 180,
  }
}

function getApproximateStrikeTarget() {
  return {
    x: 420,
    y: 69,
  }
}

function getParticleCounts() {
  return {
    min: 0,
    max: 120,
    median: 60,
  }
}

function getExperimentStats() {
  return {
    min: 0,
    max: 120,
    median: 60,
  }
}

// #endregion
