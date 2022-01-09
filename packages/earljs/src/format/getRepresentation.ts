import { CanonicalType } from '../isEqual'
import { FormatOptions } from './FormatOptions'
import { formatString } from './formatString'

export function getRepresentation(value: unknown, type: CanonicalType, options: FormatOptions) {
  if (type === 'Boolean') {
    return (value as Boolean).toString()
  } else if (type === 'Number') {
    return (value as Number).toString()
  } else if (type === 'String') {
    return formatString((value as String).toString(), options)
  } else if (type === 'RegExp') {
    return `${value}`
  } else if (type === 'Date') {
    return (value as Date).toISOString()
  }
}
