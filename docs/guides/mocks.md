---
title: Mocks
---

Mocks are dummy objects simulating behaviour of more complicated real world objects. **Earl** supports both function and
objects mocking.

## Function mocks

Imagine that we want to test simple function that transforms every single item in an array to something else (you might
be familiar with name `map`):

```typescript
function transform<T, K>(data: Array<T>, transformer: (item: T) => K) {
  const result = []

  for (const d of data) {
    result.push(transformer(d))
  }

  return result
}
```

`transform` takes an array and function `transformer` and applies `transformer` function to every item of the input
array to construct return array.

We would like to write a test asserting this description. Let's create a mock transformer and pass it to `transform`.

```typescript
import { expect, mockFn } from 'earljs'

const data = ['a', 'b']

// create a mock expecting a single string as argument and not returning anything
const mockTransformer = mockFn<[string], number>()
// setup expectations BEFORE
mockTransformer.expectedCall(['a']).returns(1)
mockTransformer.expectedCall(['b']).returns(2)

const newArray = transform(data, mockTransformer)

expect(newArray).toEqual([1, 2])
// assert that all expected calls are exhausted
// this can be automated by integrating with a test runner
expect(mockTransformer).toBeExhausted()
```

Mocks are typed and expected calls are defined upfront. Any unexpected call will result in an error right away. Also,
any expected call that wasn't executed will make last assertion (`toBeExhausted) fail. As you can probably tell by now,
the default way of creating mocks with **earl** is pretty strict, that's why we sometime call them _StrictMocks_ (later
you will learn about loose mocks).

Let's have a little bit of fun and experiment with this. Lets try to add another expected call like this:

```typescript
mockTransformer.expectedCall(['b']).returns(3)
```

You should see an error saying that the mock was not exhausted.

Similiary, if you would change `data` array you would get: an error about unexpected call. It's important to realize
that this error is thrown right when call happens NOT at the end of the test. This can help you write more strict tests.

### Typing mocks

Important thing is that you **always** need to properly type your mocks. Use `mockFn<[ARGS], RETURN>()` if you want to
provide types by hand, or if you already have a function type do:

```typescript
type StringTransformer = (something: string): string;
mockFn<StringTransformer>()
```

Due to a small TypeScript limitations, we cannot force you to provide these type arguments but if you forget to specify
types you won't be able to use mock as it will be turned into `never` type.

### Defining expectations

### Loose Mocks

## Object mocks

<!--
⚠️ Mocks API is in PREVIEW and API _will_ change but this is what you might expect:

Currently earl features two types of mocks:

- `strictMocks` are well defined mocks with expected calls and responses defined up front
- `looseMocks` are more traditional mocks similar to sinon/jest.

Both types of mocks are automatically verified (`isExhausted` check) if test runner integration is enabled.

```typescript
import { expect, strictMockFn } from 'earljs'

// create mock function expecting number as arg and returning string
const mock = strictMockFn<[number], string>()

mock.expectedCall(1).returns('a')
mock.expectedCall(2).returns('b')
mock.expectedCall(expect.a(Number)).returns('c')

expect(mock(1)).toEqual('a')
expect(mock(2)).toEqual('b')
expect(mock(5)).toEqual('c')
// unexpected call
expect(mock(1)).toThrow()

// note: use test runner integration to auto verify mocks and avoid writing this check by hand
expect(mock).toBeExhausted()
``` -->
