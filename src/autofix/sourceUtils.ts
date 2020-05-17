import LinesAndColumns from 'lines-and-columns'

interface ReplaceCallOpts {
  source: string
  line: number // starts at 0
  column: number // starts at 0
  call: string
  newArg: string
}
/**
 * Replaces function call starting at a given location.
 * Currently it uses regexp for text manipulation
 */
export function replaceCallInSource({ source, column, line, call, newArg }: ReplaceCallOpts): string {
  const lines = new LinesAndColumns(source)
  const index = lines.indexForLocation({ line, column })
  if (index === null) {
    throw new OutOfFileError()
  }

  const beforeCallSource = source.slice(0, index)
  const atCallSource = source.slice(index)

  const regexString = `^${call}\\((.*)\\)`
  const regex = new RegExp(regexString, 'm')
  const modifiedSource = atCallSource.replace(regex, `${call}(${newArg})`)
  if (modifiedSource === atCallSource) {
    throw new NoCallSiteError()
  }

  return beforeCallSource + modifiedSource
}

export class OutOfFileError extends Error {}
export class NoCallSiteError extends Error {}
export class AutofixError extends Error {
  constructor(public readonly reason: string) {
    super(`Autofix failed! It seems like source maps are not configured correctly.
Details: ${reason}`)
  }
}

/**
 * Transforms any value into a literal that can be placed back into source.
 * @todo use prettier on output
 */
export function toLiteral(value: any): string {
  // if it's an object
  if (typeof value === 'object' && value !== null) {
    const ctor = value?.constructor?.name
    const serializableTypes = ['Object']
    if (typeof value === 'object' && value !== null && !serializableTypes.includes(ctor)) {
      // ...and don't know how to serialize it, just use a matcher
      return `expect.a(${ctor})`
    }

    // otherwise run recursively
    let out = ''
    Object.keys(value).forEach((k) => {
      out += `"${k}":` + toLiteral(value[k]) + ','
    })

    return '{' + out + '}'
  }

  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }

  return JSON.stringify(value)
}
