![Earl](https://raw.githubusercontent.com/krzkaczor/earl/master/docs/images/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/krzkaczor/earl/workflows/Build%20and%20test/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square">
  </p>
</p>

## Installation

```sh
npm install --save-dev earljs
```

## Example

```typescript
import { expect } from 'earljs'

const response = await apiCall()

expect(response).toEqual({ body: { trimmed: true, timestamp: expect.any() } })
```

## Motivation

I used to love mocha + chai combo, but as time flew, I felt it's limiting. Other projects like Jest shown that there is
room for innovation in this space. With last version published 2 years ago, `Chai` seems abandoned. Furthermore, as
TypeScript becomes more and more popular, it became evident that some things about writing assertions could be improved.
**Earl** is an effort to bring a little bit of innovation in the space of assertion libraries.

### Why not just Jest?

I really enjoy some of the Jest's features — that's what inspired this library in the first place. However, I really
hate others. Simply put, Jest feels too [magical](https://github.com/facebook/jest/issues/4414) and
[full](https://github.com/facebook/jest/issues/2441) of [bugs](https://github.com/facebook/jest/issues/8688) for my
taste. Lots of its complexity comes from the features that I don't even care about like modules mocking or test
parallelization. On the other hand, I always enjoyed simplicity and confidence that Mocha provides.

## Features

### Powerful Matchers

Matchers can be values like `expect.anything()` and can be combined with `toEqual`. Allowing, for example to easily
assert not fully deterministic objects. Unlike `chai-subset` using this asserts much more info about actual object
shape.

```js
expect({
  abc: 'abc',
  timestamp: '05/02/2020 @ 8:09am (UTC)',
}).toEqual({ abc: 'abc', timestamp: expect.anyString() })
```

### Type-safe (support for TypeScript) and goes well with static analysis

```js
expect(5).toEqual('abc') // errors during compile time
// matchers are always functions, not properties which goes well with `no-unused-expressions` eslint rule
```

### AutoFix (experimental)

Automatically fix expected (if omitted) values to match actual. Option to force fix existing values. Works with
different matchers.

Implementation requires stack traces with correct sourcemaps - available in 99% environments. This feature is inspired
by Jest's inline snapshots.

```js
expect(serverResponse).toEqual()

// becomes after first run
expect(serverResponse).toEqual({ users: [{ name: 'Kris Kaczor' }] })
```

### Driven by you

Yes you! This document presents current best thinking behind this project. Help us to guide it's future development! If
you like what you see give us a 🌟. Don't hesitate to create issue in this project or reach out me directly on twitter
([@krzkaczor](https://twitter.com/krzkaczor)).

## Project state

I would call the current state a Minimal MVP ;) All of the features mentioned above work but are very limited. There are
only 2 matchers currently, autofix relies on raw text manipulation.

All of this will be improved after initial round of feedback.

## Future plans:

### Batteries included

Re-implements most common `chai` matchers and makes them part of the core.

#### Future ideas:

- Sinon like features out of the box? Creating spies is super common.
- Maybe support for type-level tests in TS?

### Extendable

TypeSafe Chai style plugins with additional matchers etc. Matchers can (and should!) implement support for autofix.

### Pretty, readable output for failed assertions

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4" width="100px;" alt="Kris Kaczor"/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/y/y/commits?author=krzkaczor" title="Code">💻</a> <a href="https://github.com/y/y/commits?author=krzkaczor" title="Documentation">📖</a> <a href="#ideas-krzkaczor" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4" width="100px;" alt="Piotr Szlachciak"/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="#ideas-sz-piotr" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-sz-piotr" title="Design">🎨</a></td><td align="center"><a href="http://twitter.com/quezak2"><img src="https://avatars0.githubusercontent.com/u/666206?v=4" width="100px;" alt="Artur Kozak"/><br /><sub><b>Artur Kozak</b></sub></a><br /><a href="#ideas-quezak" title="Ideas, Planning, & Feedback">🤔</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions of any kind welcome!

Earl logo by [@sz-piotr](https://github.com/sz-piotr)

# License

Krzysztof Kaczor MIT
