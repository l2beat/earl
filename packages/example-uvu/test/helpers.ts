import { Test, suite } from 'uvu'

export function describe(name: string, func: (test: Test) => void) {
  const test = suite(name)
  func(test)
  test.run()
}
