import { reporters } from 'mocha'

import { AssertionError } from '../errors/index.js'

export function captureError(fn: () => void): AssertionError {
  try {
    fn()
  } catch (e) {
    if (e instanceof AssertionError) {
      return e
    }
  }
  throw new Error('Could not capture error')
}

export function captureDiff(fn: () => void): string {
  return getErrorDiff(captureError(fn))
}

export function captureMochaOutput(fn: () => void): string {
  const error = captureError(fn)
  const firstLine = error.stack?.split('\n')[0] ?? ''
  return `${firstLine}\n\n${getErrorDiff(error)}`
}

export function getErrorDiff(error: AssertionError) {
  if (!error.expected || !error.actual) {
    throw new Error("Error doesn't have expected or actual values")
  }
  return mochaDiff(error.actual, error.expected)
}

export function mochaDiff(actual: string, expected: string) {
  const colors = reporters.Base.useColors
  reporters.Base.useColors = false
  const diff = reporters.Base.generateDiff(actual, expected)
  reporters.Base.useColors = colors

  return diff
    .split('\n')
    .slice(3, -1) // remove "+ expected - actual" and surrounding newlines
    .map((x) => x.slice(6)) // remove indent
    .join('\n')
}

export function stripIndent(
  template: TemplateStringsArray,
  ...expressions: unknown[]
) {
  const result = template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1] + part
  })

  const lines = result.split('\n')
  if (lines[0]?.trim() === '') {
    lines.shift()
  }
  if (lines[lines.length - 1]?.trim() === '') {
    lines.pop()
  }

  function leadingSpaces(line: string): number {
    const match = line.match(/^ */)
    return match ? match[0].length : 0
  }

  let minIndent = Math.min(
    ...lines.filter((line) => !/^\s*$/.test(line)).map(leadingSpaces),
  )

  if (minIndent === Number.POSITIVE_INFINITY) {
    minIndent = 0
  }

  return lines.map((x) => x.slice(minIndent)).join('\n')
}
