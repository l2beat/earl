---
title: Extending Earl
editLink: true
---

# {{ $frontmatter.title }}

Earl tries to provide a lot of functionality out of the box, but sometimes you need to extend it to fit your needs. This page describes how to do that, by going through the process of adding a custom matcher and validator.

::: tip
To learn the full extent of possibilities with custom matchers and validators you will need to dive into [Earl's source code](https://github.com/l2beat/earl/) as all of the built-in matchers and validators are implemented in the same way.
:::

## Adding a custom matcher

We recommend starting with a matchers as the logic is simpler and can later be reused inside the validator.

For our tutorial we'll add a `divisibleBy` matcher that checks if a number is divisible by another number.
::: code-group

```ts [divisibleBy.ts]
import { registerMatcher } from 'earl'

// We use TypeScript's module augmentation to declare our matcher.
declare module 'earl' {
  interface Matchers {
    // Matcher declarations have to return never!
    divisibleBy(divisor: number): never
  }
}

// This line of code actually adds our logic to Earl.
registerMatcher('evenNumber', evenNumber)

// The actual implementation of the matcher.
// We export it to reuse it in the validator.
export function divisibleBy(divisor: number) {
  // The value is unknown, so we need a typeof check.
  return (value: unknown): boolean => {
    return typeof value === 'number' && value % divisor === 0
  }
}
```

:::

## Adding a custom validator

Now that we have a matcher, we can use it to create a validator.

::: code-group

```ts [toBeDivisibleBy.ts]
import { Control, formatCompact, registerValidator } from 'earl'
import { divisibleBy } from './divisibleBy'

// Again we need module augmentation.
declare module 'earl' {
  interface Validators<T> {
    // Note that `this: Validators<number>` ensures that
    // the validator is only callable for numbers.
    toBeDivisibleBy(this: Validators<number>, divisor: number)
  }
}

// This line of code actually adds our logic to Earl.
registerValidator('toBeDivisibleBy', toBeDivisibleBy)

// The actual implementation of the validator.
function toBeDivisibleBy(control: Control, divisor: number) {
  const actualInline = formatCompact(control.actual)
  const divisorInline = formatCompact(divisor)
  control.assert({
    success: divisibleBy(divisor)(control.actual),
    reason: `The value ${actualInline} is not divisible by ${divisorInline}, but it was expected to.`,
    negatedReason: `The value ${actualInline} is divisible by ${divisorInline}, but it was expected not to.`,
  })
}
```

:::

## Using the custom matcher and validator

Now that we have our custom matcher and validator, we can use them in our tests.

::: code-group

```ts [test.ts]
import { expect } from 'earl'
import './divisibleBy'
import './toBeDivisibleBy'

expect(4).toBeDivisibleBy(2)
expect({
  foo: 4,
  bar: 8,
}).toEqual({
  foo: expect.divisibleBy(2),
  bar: expect.divisibleBy(4),
})
```

## Next steps

After you have compiled a set of custom matchers and validators, you can publish them as a package and share them with the community!
