import {
  type CanonicalType,
  getCanonicalType,
} from '../isEqual/getCanonicalType.js'

export function getComparedTypeName(
  value: unknown,
  sibling: unknown,
  type: CanonicalType,
  ignorePrototypes: boolean,
) {
  let typeName = getTypeName(value, ignorePrototypes)
  const siblingTypeName = getTypeName(sibling, ignorePrototypes)
  let isDifferentPrototype = false
  const isSameTypeName = typeName === siblingTypeName

  if (!ignorePrototypes && sibling) {
    if (
      isSameTypeName &&
      Object.getPrototypeOf(value) !== Object.getPrototypeOf(sibling)
    ) {
      isDifferentPrototype = true
    }
  }

  if (
    (type === 'Object' || type === 'RegExp' || type === 'Array') &&
    typeName === type
  ) {
    typeName = undefined
  }

  return { typeName, isDifferentPrototype, isSameTypeName }
}

export function getTypeName(value: unknown, ignorePrototypes: boolean) {
  if (typeof value === 'function') {
    return getFunctionTypeName(value)
  }
  if (typeof value === 'object' && value !== null) {
    return ignorePrototypes ? getCanonicalType(value) : getPrototypeName(value)
  }
}

function getPrototypeName(value: object) {
  const prototype = Object.getPrototypeOf(value)
  if (prototype === Object.prototype) {
    return 'Object'
  }
  const c = value.constructor as unknown
  if (typeof c === 'function' && c.prototype === prototype && c.name) {
    return c.name
  }
  return '[custom prototype]'
}

// biome-ignore lint/complexity/noBannedTypes: This is the best we can do
export function getFunctionTypeName(value: Function) {
  const type = getFunctionType(value)
  const name = value.name || '[anonymous]'
  return `${type} ${name}${type === 'class' ? '' : '()'}`
}

// biome-ignore lint/complexity/noBannedTypes: This is the best we can do
function getFunctionType(value: Function) {
  if (value.toString().startsWith('class')) {
    return 'class'
  }
  switch (value.constructor.name) {
    case 'GeneratorFunction':
      return 'function*'
    case 'AsyncGeneratorFunction':
      return 'async function*'
    case 'AsyncFunction':
      return 'async function'
  }
  return 'function'
}
