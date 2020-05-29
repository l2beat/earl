![Earl](https://raw.githubusercontent.com/krzkaczor/earl/master/docs/images/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library for TypeScript</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/krzkaczor/earl/workflows/Build%20and%20test/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square">
  </p>
</p>

## Features

- 💪 Powerful validators and matchers
- 🤖 Type-safe - written in TypeScript and goes well with static analysis
- ✍ AutoFix - magically writes missing assertions for you
- 🎭 Builtin support for mocks
- 🏃‍♂️ Integration with test runners (mocha)

## Installation

```sh
npm install --save-dev earljs
```

## Example

```typescript
import { expect } from 'earljs'

// ...

expect(response).toEqual({ body: { trimmed: true, timestamp: expect.a(String) } })
```

## Motivation

I used to love mocha + chai combo, but as time flew, I felt it's limiting. Other projects like Jest shown that there is
room for innovation in this space. With last version published 2 years ago, `Chai` seems abandoned. Furthermore, as
TypeScript becomes more and more popular, it became evident that some things about writing assertions could be improved.
**earl** is an effort to bring a little bit of innovation in the space of assertion libraries.

### Why not just Jest?

I really enjoy some of the Jest's features — that's what inspired this library in the first place. However, I really
hate others. Jest feels too [magical](https://github.com/facebook/jest/issues/4414) and
[full](https://github.com/facebook/jest/issues/2441) of [bugs](https://github.com/facebook/jest/issues/8688) for my
taste. On the other hand, I always enjoyed simplicity and confidence that Mocha provides.

Simply put, **Jest takes control away from you, Mocha puts you in charge**.

## Features

### 💪 Powerful validators and matchers

Validators like `toEqual` or `toThrow` are acting as advanced assertions. They can be combined with matchers like
`expect.anything()` to match whole ranges of values. Allowing, for example to easily assert not fully deterministic
objects. Unlike `chai-subset` using this asserts much more info about actual object shape.

```js
expect({
  data: { id: 5, name: 'Kris' },
  timestamp: '05/02/2020 @ 8:09am (UTC)',
}).toEqual({
  data: { id: expect.a(Number), name: 'Kris' },
  timestamp: expect.a(String),
})
```

### 🤖 Type-safe (support for TypeScript) and goes well with static analysis

Validators are typesafe by default ex. when comparing objects with toEqual they have to have same types. Furthermore,
validators are always functions, not properties like in `chai`. This goes well with `no-unused-expressions` eslint rule.

```js
expect(5).toEqual('abc') // 💥 blows up during compile time
```

### ✍️ AutoFix

Automatically fix expected (if omitted) values to match actual. Works with different validators.

Implementation requires stack traces with correct sourcemaps - available in 99% environments. This feature is inspired
by Jest's inline snapshots.

```js
expect(serverResponse).toEqual()

// becomes after first run
expect(serverResponse).toEqual({ users: [{ name: 'Kris Kaczor' }] })
```

### ✨ Driven by you

Yes you! Help us to guide it's future development! If you like what you see give us a 🌟. Don't hesitate to create issue
in this project or reach out me directly on twitter ([@krzkaczor](https://twitter.com/krzkaczor)). Take a look at our
roadmap.

## API

Validators are advanced assertions, most of them work with additional matchers.

### Validators

- `toEqual(object)` - performs deep equality check, ensures type equality, supports additional matchers
- `toLooseEqual(object)` - like toEqual but without type checking
- `toThrow(expectedErrorMsg?: string)` - checks if expected error was throws. Requires checked value to be a
  parameterless function.
- `toBeRejected(expectedErrorMsg?: string)` - checks if promise was rejected with a expected error. Note: this validator
  returns another promise that needs to be handled properly (awaited or returned from test case). To avoid mistakes use
  [`no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)
  eslint rule (it's part of [TypeSTRICT](https://github.com/krzkaczor/typestrict)).
- `toBeExhausted()` - checks if given mock is exhausted. Works both with strict and loose mocks.

### Matchers

Matchers are used to match range of values. These should be combined with validators like `toEqual` or strictMocks's
`expectedCall`.

- `anything()` - matches anything
- `a(class)` - matches any instance of a class. Works as expected with primitives like String, Number etc. Use
  `a(Object)` to match any object (won't match null). Note: it doesn't work with TypeScript types because they are
  erased from the output - you need a JS class.
- `stringMatching(substring | regexp)` - matches any string containing given substring or matching given pattern
- `numberCloseTo(expected, delta)` - matches any number within proximity of expected number

### Modifiers

- `not` - will make expectation fail when it should succeed and succeed when it should fail

### Mocks

Currently earl features two types of mocks:

- `strictMocks` are well defined mocks with expected calls and responses defined up front
- `looseMocks` are more traditional mocks similar to sinon/jest.

Both types of mocks are automatically verified (`isExhausted` check) if test runner integration is enabled.

### Examples:

```js
import { expect, strictMockFn } from 'earljs'

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
```

### Test runner integration

By integrating with a test runner you get:

- automatic mocks verification after each test

Currently only integration with `mocha` is supported. To enable, simply require `earljs/mocha` with mocha, you can put
it in `.mocharc.js`:

```js
module.exports = {
  require: ['earljs/mocha'],
  // ...
}
```

## 🛣️ Roadmap

To help us prioritize future work you can vote with GH reactions 👍

- [🔌 Plugin system ](https://github.com/krzkaczor/earl/issues/30)
- [📸 Snapshots](https://github.com/krzkaczor/earl/issues/31)
- [Mocks](https://github.com/krzkaczor/earl/issues/12) - Current implementation is minimal and supports only function
  mocks
- [Improve diff readability](https://github.com/krzkaczor/earl/issues/15)
- More standard validators and matchers
- Autofix improvements - support prettier etc.

## ✨ Contributors

[Our contributing guide](./CONTRIBUTING.md).

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4" width="100px;" alt="Kris Kaczor"/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/y/y/commits?author=krzkaczor" title="Code">💻</a> <a href="https://github.com/y/y/commits?author=krzkaczor" title="Documentation">📖</a> <a href="#ideas-krzkaczor" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4" width="100px;" alt="Piotr Szlachciak"/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="https://github.com/y/y/commits?author=sz-piotr" title="Code">💻</a> <a href="#ideas-sz-piotr" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-sz-piotr" title="Design">🎨</a></td><td align="center"><a href="http://twitter.com/quezak2"><img src="https://avatars0.githubusercontent.com/u/666206?v=4" width="100px;" alt="Artur Kozak"/><br /><sub><b>Artur Kozak</b></sub></a><br /><a href="#ideas-quezak" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions of any kind welcome!

Earl logo by [@sz-piotr](https://github.com/sz-piotr)

# License

Kris Kaczor MIT
