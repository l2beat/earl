import { Dictionary } from 'ts-essentials'

/**
 * Transforms any value into a literal that can be placed back into source.
 * @todo use prettier on output
 */
export function toLiteral(value: any): string {
  // if it's an object
  if (typeof value === 'object' && value !== null) {
    const ctor = value?.constructor?.name

    // note: this could be extracted and made configurable as "autofixSerializers"
    if (Array.isArray(value)) {
      return toArrayLiteral(value)
    }

    if (ctor === 'Object') {
      return toObjectLiteral(value)
    }

    if (value instanceof Error) {
      return `expect.error(${toLiteral(value.message)})`
    }

    // if we don't know how to serialize it just use "a" matcher
    return `expect.a(${ctor})`
  }

  if (value === null) {
    return 'null'
  }
  if (value === undefined) {
    return 'undefined'
  }

  return JSON.stringify(value)
}

// @note: sorts keys alphabetically
function toObjectLiteral(value: Dictionary<string>): string {
  let out = ''
  Object.keys(value)
    .sort((a, b) => a.localeCompare(b))
    .forEach((k) => {
      out += `"${k}":` + toLiteral(value[k]) + ','
    })

  return '{' + out + '}'
}

function toArrayLiteral(value: Array<any>): string {
  const out = value.map(toLiteral).join(',')

  return '[' + out + ']'
}
