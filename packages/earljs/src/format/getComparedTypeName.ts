import { CanonicalType, getCanonicalType } from '../isEqual'

export function getComparedTypeName(value: unknown, sibling: unknown, type: CanonicalType, ignorePrototypes: boolean) {
  let typeName = getTypeName(value, ignorePrototypes)
  const siblingTypeName = getTypeName(sibling, ignorePrototypes)
  let isDifferentPrototype = false
  const isSameTypeName = typeName === siblingTypeName

  if (!ignorePrototypes && sibling) {
    if (isSameTypeName && Object.getPrototypeOf(value) !== Object.getPrototypeOf(sibling)) {
      isDifferentPrototype = true
    }
  }

  if ((type === 'Object' || type === 'RegExp' || type === 'Array') && typeName === type) {
    typeName = undefined
  }

  return { typeName, isDifferentPrototype, isSameTypeName }
}

export function getTypeName(value: unknown, ignorePrototypes: boolean) {
  if (typeof value === 'function') {
    return getFunctionTypeName(value)
  } else if (typeof value === 'object' && value !== null) {
    return ignorePrototypes ? getCanonicalType(value) : getPrototypeName(value)
  }
}

function getPrototypeName(value: object) {
  const prototype = Object.getPrototypeOf(value)
  if (prototype === Object.prototype) {
    return 'Object'
  }
  const constructor = value.constructor
  if (constructor?.prototype === prototype && constructor.name) {
    return constructor.name
  }
  return '[custom prototype]'
}

export function getFunctionTypeName(value: Function) {
  const type = getFunctionType(value)
  const name = value.name || '[anonymous]'
  return `${type} ${name}${type === 'class' ? '' : '()'}`
}

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
