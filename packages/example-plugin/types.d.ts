import { numberUtilsPlugin } from './src/NumberUtilsPlugin'

type Config = typeof numberUtilsPlugin
type Matchers = Config['matchers']
type Validators = Config['validators']

declare module 'earljs' {
  interface ExpectInterface extends Matchers {}
  interface Expectation<T> extends Validators {}
}

export {}
