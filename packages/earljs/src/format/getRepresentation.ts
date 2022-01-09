import { CanonicalType } from '../isEqual'

export function getRepresentation(value: unknown, type: CanonicalType) {
  if (type === 'Boolean') {
    return (value as Boolean).toString()
  } else if (type === 'Number') {
    return (value as Number).toString()
  } else if (type === 'String') {
    return JSON.stringify((value as String).toString())
  } else if (type === 'RegExp') {
    return `${value}`
  } else if (type === 'Date') {
    return (value as Date).toISOString()
  }
}
