---
title: Why Earl?
editLink: true
outline: [2, 3]
---

# {{ $frontmatter.title }}

:::info
If you can't wait to start using Earl proceed to [Getting started](/introduction/getting-started).
:::

## Motivation

As a lot of projects in the JavaScript ecosystem Earl was born out of
frustration with the status quo and a desire to build something better. We've
tried it all: Mocha+Chai, Jest, Vitest and many more. Mocha was something
we kept coming back to, but felt that Chai was holding it back.

We wanted to have something that combined the simplicity, robustness and speed
of Mocha with a modern and type-safe API for assertions.

And so, we created Earl!

## Core principles

When we set out to build Earl we landed on a few core principles:

### Type safety

We believe type safety is a crucial aspect of writing reliable and maintainable code. With Earl, we wanted to ensure that the validators, like `toEqual`, are type safe, which prevents mistakes and enhances the developer experience with editor completions.

By incorporating type safety in the library, we minimize the risk of writing incorrect test cases or introducing subtle bugs that may slip through the cracks. This focus on type safety guarantees that the assertions in your tests align with the expected types and values, leading to robust and reliable test code.

Here's an example of this principle in action:

```ts
interface User {
  name: string
  email: string
  notificationCount: number
}
const result: User = await api.getCurrentUser()

// This code fails to compile, and TypeScript provides this useful
// error message:
// Property 'notificationCount' is missing in type
// '{ name: string; email: any; }' but required in type 'User'.
expect(result).toEqual({
  name: 'John Doe',
  email: expect.a(String),
})
```

### Clarity

Clarity is at the heart of Earl's design, ensuring that tests are easy to read, write, and maintain. We've designed an expressive yet concise API for writing assertions that are self-explanatory and easy to understand. But our commitment to clarity doesn't stop there; we've also put significant effort into crafting helpful and informative error messages.

We understand that debugging test failures can be a time-consuming process. That's why we've gone the extra mile to create error messages that are as useful as possible. These messages not only pinpoint the issue but also provide contextual information about the failed assertion. To achieve this, we've even rewritten stack traces to display the specific assertion that was called, making it easier for developers to identify and resolve problems quickly.

This example illustrates how Earl's error messages can help you quickly identify the root cause of a test failure:

::: code-group

```ts [math.ts]
export function divide(a: number, b: number) {
  return a / b
}
```

:::
::: code-group

```ts [math.test.ts]
import { expect } from 'earl'
import { divide } from './math'

it('throws an error when dividing by zero', () => {
  expect(() => divide(1, 0)).toThrow('Division by zero')
})
```

:::

And here's the mocha output that you'll see when the test fails:

```
  1) throws an error when dividing by zero:
     The function call did not throw an error, but it was expected to.
      at expect().toThrow (math.test.ts:5:30)
```

You can clearly see the reason why the assertion failed ("The function call did not throw an error, but it was expected to.") and you can also see the validator function and the exact line of code that caused the failure.

This might seem benign, but you'd be surprised how many tools get this part really wrong, especially in async contexts.

### Uniformity

Earl's API is designed to be consistent and predictable. We've taken great care to ensure that the API is easy to learn and use. We've also made sure that the API is consistent across all validators, so you can easily switch between them without having to learn a new API for each one. Earl also provides a single way to do each thing, so you never need to pick between many options while just trying to get the job done.

This one is best illustrated with examples of design decisions we've made:

```ts
// We don't have a `toBe` validator, because it's the same as `toEqual`.
expect(1).toEqual(1)
expect({ x: 1 }).toEqual({ x: 1 })

// Referential equality checking is done with `toExactlyEqual`,
// but it doesn't support primitives, because for them it'd be
// the same as `toEqual`.
expect({ x: 1 }).not.toExactlyEqual({ x: 1 })

// We don't have a `toBeNull`, `toBeUndefined`, `toBeTrue` and many
// more like them, because they're the same as `toEqual`.
expect(null).toEqual(null)
expect(undefined).toEqual(undefined)
expect(true).toEqual(true)

// We don't have a special syntax for async code.
expect(await someAsyncFunction()).toEqual(1)

// But we do have special validators for async code that throws.
await expect(someAsyncFunctionThatThrows()).toBeRejected()
```

### Composability

Composability is a key feature of Earl, promoting a modular approach to writing tests by combining and reusing different components, such as matchers and validators. Matchers can be used alongside validators to create flexible and tailored assertions, allowing users to fine-tune their test cases to be as loose or as specific as desired.

For example, you can use matchers like `expect.a(Number)` within a validator, as shown here:

```ts
const vector = {
  x: Math.random(),
  y: Math.random(),
}

expect(vector).toEqual({
  x: expect.a(Number),
  y: expect.a(Number),
})
```

This enables greater flexibility in testing various values and ensures that your assertions are adaptable to a wide range of scenarios.

By offering composable matchers and validators, Earl empowers developers to create custom assertions that suit their unique testing needs. This versatility makes Earl a powerful tool for testing TypeScript applications, enabling developers to write tests that are both comprehensive and adaptable to changing requirements and dynamic values.

## But wait, there's more!

Earl offers a wide array of additional features designed to make your testing experience even better. These tools and functionalities help you tackle various testing challenges, ensuring that Earl remains a versatile and comprehensive testing library for TypeScript projects.

Here's a brief overview of some of the other exciting features Earl provides:

- **Mock functions**: Earl includes built-in support for creating mock functions, streamlining the process of testing interactions between functions and components.

- **Validators for mock functions**: To complement the mock functions, Earl offers dedicated validators that help you verify if a mock function has been called with the correct arguments or the expected number of times.

- **Mock objects**: Mock objects in Earl allow you to create lightweight and customizable objects for testing purposes, making it easier to isolate specific parts of your code for testing.

- **Snapshots**: Snapshot testing support in Earl enables you to capture the output of your components or functions at a specific point in time. This functionality allows you to easily track changes in your code's behavior and detect unexpected regressions.

- **Support for Zod**: Earl integrates seamlessly with the Zod validation library, enabling you to combine the power of both libraries to create even more robust and reliable tests.

- **Extensibility**: Earl provides the ability to extend its core functionality by adding custom validators and matchers. This feature allows you to tailor Earl to your specific testing requirements, making it a highly adaptable tool for your TypeScript projects.

By offering a diverse range of features and the ability to extend its capabilities, Earl solidifies its position as a powerful and comprehensive testing solution for the TypeScript ecosystem.
