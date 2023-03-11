import { CanonicalType } from '../isEqual/getCanonicalType'
import { FormatOptions } from './FormatOptions'
import { formatString } from './formatString'

export function getRepresentation(value: unknown, type: CanonicalType, options: FormatOptions) {
  if (type === 'Boolean') {
    return (value as boolean).toString()
  } else if (type === 'Number') {
    return (value as number).toString()
  } else if (type === 'String') {
    return formatString((value as string).toString(), options)
  } else if (type === 'RegExp') {
    return (value as RegExp).toString()
  } else if (type === 'Date') {
    return (value as Date).toISOString()
  }
}
