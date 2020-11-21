import { EvenNumberMatcher, toBeEven } from './src/NumberUtilsPlugin'

declare module 'earljs' {
  interface ExpectInterface {
    evenNumber: typeof EvenNumberMatcher.make
  }

  interface Expectation<T> {
    toBeEven: typeof toBeEven
  }
}

export {}
