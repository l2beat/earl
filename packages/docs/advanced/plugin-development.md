---
title: Plugin development
---

_Note: plugin APIs is experimental and we welcome any feedback._

**Earl** Plugins can:

- Attach new matchers to `expect`
- Attach new validators to `Exception` class
- Add new `smartEq` validation rules that are used internally to compare values

A plugin is an object conforming to the `PluginConfig` interface:

```typescript
export interface PluginConfig {
  matchers?: Record<string, DynamicMatcher>
  validators?: Record<string, DynamicValidator<any>>
  smartEqRules?: ReadonlyArray<SmartEqRule>
}

export type DynamicValidator<T> = (
  this: Expectation<T>,
  ...args: any[]
) => void | Promise<void>
export type DynamicMatcher = (...args: any[]) => any // real type should be Matcher but can be cast to anything for improved DX
export type SmartEqRule = (
  actual: any,
  expected: any,
  strict: boolean,
) => SmartEqResult | undefined
```

This type and other necessities for plugin development are exposed in
`earljs/internal` module.

## Typings

Plugins should provide type information by tweaking **earl**'s public interfaces
but if you use TypeScript to develop your plugin it can
[be done automatically](https://github.com/earl-js/earl/blob/master/packages/example-plugin/types.d.ts).

## Examples

- [Plugin example](https://github.com/earl-js/earl/blob/master/packages/example-plugin)
- [Example of using plugin](https://github.com/earl-js/earl/blob/master/packages/example/test)
