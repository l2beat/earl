import * as z from 'zod'

// #region setup
class Employee {
  constructor(
    public name: string,
    public age: number,
  ) {}
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
  readonly species: string
  constructor(
    public name: string,
    opts?: { species: 'shark' },
  ) {
    this.species = opts?.species ?? 'fish'
  }
}
const crazyZoologist = {
  name: 'John Doe',
  pet: new Fish('Nemo', { species: 'shark' }),
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

class Person {
  constructor(
    public firstName: string,
    public lastName: string,
  ) {}
}

class Vector2 {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}

async function getLatestProduct() {
  return {
    name: 'Turbocharger 9000',
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    pricing: {
      price: 0.5,
      currency: 'BTC',
    },
  }
}

// #endregion
