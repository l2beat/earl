---
title: Using mocks
editLink: true
---

# {{ $frontmatter.title }}

Testing code often involves simulating the behavior of dependencies, such as functions and objects, to isolate the unit being tested. Mocks are powerful tools that allow you to create test doubles for these dependencies. In this article, we will discuss how to create and use mocks with the Earl library.

## Creating mock functions

Mock functions work just like regular functions, but their behavior can be controlled by the test, and they record information about how they were called.

To create a mock function, use the `mockFn` function:

```ts
const dummy = mockFn()

expect(dummy).toThrow('no default behavior has been provided')
```

This function will throw when called, however, because it wasn't configured in any way. To configure the behavior of the mock function, use the `mockFn` function with a callback:

```ts
const hello = mockFn((name: string) => `Hello, ${name}!`)

expect(hello('world')).toEqual('Hello, world!')
```

Alternatively, use one of the many customization functions:

```ts
const hello = mockFn().returnsOnce('Hello, world!').returns(42)

expect(hello()).toEqual('Hello, world!')
expect(hello()).toEqual(42)
expect(hello()).toEqual(42)
```

You can learn about all the different customization functions in the [API reference](/api/api-reference).

## Mocking objects

Mocking objects is a bit more involved than mocking functions. Earl provides a `mockObject` function that allows you to create a mock object with a specific TypeScript type. This function takes an object with properties that will be mocked on the resulting value. Other properties will throw an error on access.

Functions that are mocked will be replaced with mock functions. You can use the `mockFn` customization functions to configure the behavior of these functions.

```ts
import { mockObject } from 'earl'

class Person {
  constructor(public name: string, public age: number) {}

  isAdult() {
    return this.age >= 18
  }
}

const mock = mockObject<Person>({
  isAdult: () => true,
})

expect(mock.isAdult()).toEqual(true)
mock.isAdult.returns(false)
expect(mock.isAdult()).toEqual(true)

expect(mock.isAdult).toHaveBeenCalledTimes(2)

expect(() => mock.name).toThrow('no mock value provided')
```

## Testing mock functions

Mock functions are useful for testing code that calls other functions. You can use them to assert that the function was called with the correct arguments and that it was called the correct number of times.

Earl provides a number of validators tailored specifically for that use case:

- `toHaveBeenCalled`
- `toHaveBeenCalledTimes`
- `toHaveBeenCalledWith`
- `toHaveBeenExhausted`
- `toHaveBeenLastCalledWith`
- `toHaveBeenNthCalledWith`
- `toHaveBeenOnlyCalledWith`

```ts
const hello = mockFn((name: string) => `Hello, ${name}!`)

hello('world')

expect(hello).toHaveBeenOnlyCalledWith('world')

hello('John')

expect(hello).toHaveBeenCalled()
expect(hello).toHaveBeenCalledTimes(2)
expect(hello).toHaveBeenCalledWith('world')
expect(hello).toHaveBeenLastCalledWith('John')
expect(hello).toHaveBeenNthCalledWith(1, 'world')
```

Mocks also have a concept of being exhausted. This allows you to ensure that your tests cover every predetermined scenario configured in the mock. Default behavior is not considered an exhaustible scenario.

```ts
const hello = mockFn()
  .returnsOnce('Hello, world!')
  .returnsOnce('Hello, John!')
  .returns(42)

expect(hello).not.toHaveBeenExhausted()

expect(hello()).toEqual('Hello, world!')
expect(hello).not.toHaveBeenExhausted()

expect(hello()).toEqual('Hello, John!')
expect(hello).toHaveBeenExhausted()
```
