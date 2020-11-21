---
title: Plugin development
---

_Note: plugin APIs is experimental and we welcome any feedback._

**Earl** Plugins can:

- Attach new matchers to `expect`
- Attach new validators to `Exception` class
- Add new `smartEq` validation rules that internally is used to compare values

Plugin is a synchronous function that returns `PluginConfig` object:

```typescript
export type DynamicValidator<T> = (
  this: Expectation<T>,
  ...args: any[]
) => void | Promise<void>

export type DynamicMatcher = (...args: any[]) => Matcher

export type SmartEqRule = (
  actual: any,
  expected: any,
  strict: boolean,
) => SmartEqResult | undefined

export interface PluginConfig {
  matchers?: Record<string, DynamicMatcher>
  validators?: Record<string, DynamicValidator<any>>
  smartEqRules?: SmartEqRule[]
}
```

## Typings

Plugins should provide type information tweaking **earl**'s public interfaces.

## Examples

- [Plugin example](https://github.com/earl-js/earl/blob/master/packages/example-plugin)
- [Example of using plugin](https://github.com/earl-js/earl/blob/master/packages/example/test)
