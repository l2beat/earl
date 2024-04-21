import type { CanonicalType } from '../isEqual/getCanonicalType.js'
import type { FormatOptions } from './FormatOptions.js'
import { formatString } from './formatString.js'

export function getRepresentation(
  value: unknown,
  type: CanonicalType,
  options: FormatOptions,
) {
  if (type === 'Boolean') {
    return (value as boolean).toString()
  }
  if (type === 'Number') {
    return (value as number).toString()
  }
  if (type === 'String') {
    return formatString((value as string).toString(), options)
  }
  if (type === 'RegExp') {
    return (value as RegExp).toString()
  }
  if (type === 'Date') {
    const iso = (value as Date).toISOString()
    if (iso.endsWith('T00:00:00.000Z')) {
      return iso.slice(0, -14)
    }
    if (iso.endsWith('.000Z')) {
      return `${iso.slice(0, -5)}Z`
    }
    return iso
  }
}
