import { Control } from '../Control'
import { AMatcher } from '../matchers'
import { formatValue } from './common'

export function toBeA<T>(control: Control<T>, clazz: any) {
  const m = new AMatcher(clazz)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} is not a instance of ${formatValue(clazz)}`,
    negatedReason: `${formatValue(control.actual)} is a instance of ${formatValue(clazz)}`,
  })
}
