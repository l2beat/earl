---
title: Why Earl?
editLink: true
---

# {{ $frontmatter.title }}

:::info
If you can't wait to start using Earl proceed to [Getting started](/introduction/getting-started).
:::

## The world without Earl

Over the years we've seen many testing frameworks come and go. When a new one
is developed features that are prioritized are usually speed, parallelism and
compatibility with the ever expanding JavaScript ecosystem.

Having used many of them over the years including Jest and Vitest we've found
that they unfortunately fall short on the following fronts:

1. Simplicity - The feature set keeps growing, often introducing multiple
   conflicting ways of achieving the same goal. The complexity of those tools
   also makes them [unfortunately](https://github.com/facebook/jest/issues/4414)
   very [prone](https://github.com/facebook/jest/issues/2441) to
   [bugs](https://github.com/facebook/jest/issues/8688).
2. Speed - By trying to be maximally parallel and maximally compatible those
   frameworks often end up being [slower](https://github.com/facebook/jest/issues?q=is%3Aissue+slow+is%3Aopen)
   than their predecessors, because of the overhead of running each file in
   parallel and trying to juggle the complexity of js transpilation.
3. Type safety - With the rise of TypeScript it seems silly to us that testing
   frameworks are not taking advantage of the type system to provide better
   error messages and more powerful assertions.

There is one framework however, that we've been using for years and loving it.
Mocha isn't new, isn't fancy, but it is really good at getting the job done and
getting out of your way. It's also very fast and simple to use.

Mocha however is just a test runner and should be paired with an assertion
library like Chai. Chai was nice years ago, but it feels really dated now,
requiring plugins to (barely) handle newer features like async/await.

Here is where Earl comes in. Earl is a modern assertion library for Mocha that
is type-safe, fast and simple to use.

## A taste of Earl

With Earl you are able to leverage the simplicity, speed and robustness of a
mature test framework like Mocha and combine it with modern assertions, type
safety, mocking tools and a great developer experience.

Check it out yourself!

```ts
import { expect, mockObject } from 'earl'
import { CreditCardValidator } from './CreditCardValidator'
import { PaymentProcessor } from './PaymentProcessor'

describe(PaymentProcessor.name, () => {
  it('correctly processes payment', async () => {
    // Create mock objects while remaining fully type safe
    const validator = mockObject<CreditCardValidator>({
      validateCreditCard: async () => true,
    })
    const processor = new PaymentProcessor(validator)

    const result = await processor.processPayment({
      creditCardNumber: '1234 5678 9012 3456',
      amount: Math.random(),
    })

    // Assert deep equality with ease
    expect(result).toEqual({
      success: true,
      // Leverage asymmetric matchers to make assertions more flexible
      message: expect.includes('payment successful'),
    })

    // Spy on mock functions and assert on their calls
    expect(validator.validateCreditCard).toHaveBeenLastCalledWith(
      creditCardNumber: '1234 5678 9012 3456',
      amount: expect.a(Number),
    })
  })
})
```

Earl is also carefully optimized for providing developers with enough context
so that they are able to act on failing assertions efficiently.

1. **Useful error messages**
   <p>
   We have spent a lot of time to make sure that error messages are helpful
   and meaningful for every assertion made using Earl.
   </p>
   <p>
   We have also developed a custom deep equality algorithm that is tightly
   integrated to our object formatter, so that the object diffs can display
   issues such as mismatched prototypes, unique symbols and more.
   </p>

2. **Type safety**
   <p>
   Earl is written in TypeScript and uses the type system to reduce developer
   errors and provide editor completions when writing assertions.
   </p>

3. **Mocks**
   <p>
   Earl comes with a powerful mocking toolkit that allows you to mock any
   function or object. It is fully integrated with the rest if Earl and allows
   you to write very flexible tests.
   </p>

4. **Snapshot testing**
   <p>
   We've included first class support for snapshots that unlike other options
   in the ecosystem doesn't require hooking into nodejs internals and overriding
   module loading code. Because of this it is much more robust and works with
   many test runners.
   </p>
