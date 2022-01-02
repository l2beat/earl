export function getTypeName(value: object, sibling: unknown) {
  let valueTypeName = getIsolatedTypeName(value)
  if (typeof sibling === 'object' && sibling !== null) {
    const siblingTypeName = getIsolatedTypeName(sibling)
    if (valueTypeName === siblingTypeName && Object.getPrototypeOf(value) !== Object.getPrototypeOf(sibling)) {
      valueTypeName += ' (different prototype)'
    }
  }
  return valueTypeName
}
function getIsolatedTypeName(value: object) {
  const prototype = Object.getPrototypeOf(value)
  if (prototype === Object.prototype) {
    return 'Object'
  }
  const constructor = value.constructor
  if (constructor.prototype === prototype) {
    return constructor.name
  }
  return '[custom prototype]'
}
