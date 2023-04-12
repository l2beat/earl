import { Control } from '../../Control.js'
import { registerValidator } from '../../expect.js'
import { formatCompact } from '../../format/index.js'
import { includes } from '../../matchers/objects/includes.js'

type MemberOf<T> = T extends (infer U)[]
  ? U
  : T extends Set<infer U>
  ? U
  : T extends Iterable<infer U>
  ? U
  : unknown

declare module '../../expect.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Validators<T> {
    /**
     * Asserts that a string includes all of the provided substrings. The
     * substrings can overlap.
     *
     * If you want to match a nested value, use the matcher
     * `expect.includes(...)` instead.
     *
     * @param substrings - The substrings to look for. Cannot be matchers.
     *
     * @example
     * ```ts
     * expect('i like pancakes').toInclude('like', 'cakes')
     * expect('animals').toInclude('ani', 'nim', 'mal')
     *
     * expect('robot').not.toInclude('cupcake')
     * ```
     */
    toInclude(this: Validators<string>, ...substrings: string[]): void

    /**
     * Asserts that an array, set or iterable includes all of the provided
     * items.
     *
     * If you want to match a nested value, use the matcher
     * `expect.includes(...)` instead.
     *
     * @param items - The items to look for. Can be matchers.
     *
     * @example
     * ```ts
     * expect([1, 'foo', false]).toInclude(expect.a(Boolean), 'foo')
     * expect(new Set([5, 6])).toInclude(5)
     *
     * // type-error: type string is not assignable to boolean
     * expect([true, false]).not.toInclude('magic')
     * ```
     */
    toInclude(
      this: Validators<any[] | Set<any> | Iterable<any>>,
      ...items: MemberOf<T>[]
    ): void
  }
}

registerValidator('toInclude', toInclude)

export function toInclude(control: Control, ...items: unknown[]) {
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
