---
title: Handling errors
editLink: true
---

# {{ $frontmatter.title }}

Errors are a natural part of any application, and it is important to ensure that your code handles them correctly. Earl provides several validators for working with errors, making it easy to test the behavior of your functions and promises when they encounter exceptional situations.

## Throwing errors

The `toThrow` validator is used to check if a function throws an error when called. It can be used with optional arguments to specify the expected error message, a specific error class, or both the error class and a message. The message can be a complete error message, a partial message, or a regex pattern.

Here's an example of using `toThrow` without arguments:

```ts
function throwError() {
  throw new Error('Something went wrong')
}

expect(throwError).toThrow()
```

You can provide an error message, a specific error class, or both as arguments to the toThrow validator:

```ts
function throwCustomError() {
  throw new TypeError('Invalid type')
}

expect(throwError).toThrow('Something went wrong')
expect(throwCustomError).toThrow(TypeError)
expect(throwCustomError).toThrow(TypeError, 'Invalid type')
```

You can also use a regex pattern to match part of the error message:

```ts
expect(throwError).toThrow(/went wrong/)
expect(throwCustomError).toThrow(TypeError, /Invalid/)
```

By using the toThrow validator with optional arguments, you can test if your functions throw the expected errors with the correct messages and error classes.

## Testing rejections

When working with asynchronous functions or promises, you can use the toBeRejected validator to check if a function or promise is rejected.

::: info
Don't forget to use `await` when working with async code!
:::

```ts
async function fetchResource() {
  throw new Error('Failed to fetch resource')
}

const rejectedPromise = Promise.reject(new Error('Something went wrong'))

await expect(fetchResource()).toBeRejected()
await expect(rejectedPromise).toBeRejected()
```

## Checking rejection reasons

In addition to checking for rejections, you can also verify the reason for the rejection using the `toBeRejectedWith` validator. This allows you to ensure that your code is throwing the expected errors.

```ts
async function fetchResource() {
  throw new Error('Failed to fetch resource')
}

const rejectedPromise = Promise.reject(new Error('Custom error message'))

await expect(fetchResource()).toBeRejectedWith(Error, /resource/)
await expect(rejectedPromise).toBeRejectedWith('Custom error message')
```

By using these validators, you can thoroughly test the error handling capabilities of your code and ensure that it behaves as expected when encountering exceptional situations.
