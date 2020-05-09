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
    throw new CallNotFoundError(`Location ${line}:${column} out of file`)
  }

  const beforeCallSource = source.slice(0, index)
  const atCallSource = source.slice(index)

  const regexString = `^${call}\\((.*)\\)`
  const regex = new RegExp(regexString, 'm')
  const modifiedSource = atCallSource.replace(regex, `${call}(${newArg})`)
  if (modifiedSource === atCallSource) {
    throw new CallNotFoundError(`Couldn't find a call ${call} at location ${column}:${line}`)
  }

  return beforeCallSource + modifiedSource
}

export class CallNotFoundError extends Error {
  constructor(public readonly reason: string) {
    super(`CallNotFound: ${reason}`)
  }
}

/**
 * Transforms object into a literal that can be placed back into source.
 * @todo use prettier on output
 */
export function toLiteral(value: any): string {
  return JSON.stringify(value)
}
