import { Control } from '../../Control'
import { registerValidator } from '../../expect'
import { formatCompact } from '../../format'
import { includes } from '../../matchers/objects/includes'

type MemberOf<T> = T extends (infer U)[]
  ? U
  : T extends Set<infer U>
  ? U
  : T extends Iterable<infer U>
  ? U
  : unknown

declare module '../../expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T, R> {
    toInclude(this: Validators<string, R>, ...substrings: string[]): R
    toInclude(
      this: Validators<any[] | Set<any> | Iterable<any>, R>,
      ...items: MemberOf<T>[]
    ): R
  }
}

registerValidator('toInclude', toInclude)

export function toInclude(control: Control<unknown>, ...items: unknown[]) {
  const actualInline = formatCompact(control.actual)
  const itemsInline = formatItems(items)

  if (items.length === 0) {
    throw new TypeError('toInclude requires at least one argument')
  }

  control.assert({
    success: includes(...items)(control.actual),
    reason: `The value ${actualInline} does not include ${itemsInline}, but it was expected to.`,
    negatedReason: `The value ${actualInline} includes ${itemsInline}, but it was expected not to.`,
  })
}

function formatItems(items: unknown[]) {
  const joined = languageJoin(items.map((x) => formatCompact(x, 20)))
  return joined.length > 50 ? `all of: ${items.length} items` : joined
}

function languageJoin(items: string[]) {
  if (items.length === 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return items[0]!
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `all of: ${items.slice(0, -1).join(', ')} and ${items.at(-1)}`
}
