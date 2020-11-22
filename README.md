![Earl](https://raw.githubusercontent.com/earl-js/earl/master/packages/docs/images/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library for TypeScript</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/earl-js/earl/workflows/CI/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
    <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square">
    <!-- ALL-CONTRIBUTORS-BADGE:END --> 
  </p>
</p>

## Features

- 💪 Powerful validators and matchers
- 🤖 Type-safe - written in TypeScript and goes well with static analysis
- 🎭 Builtin support for mocks
- ☕ Works great with Mocha

## Installation

```sh
npm install --save-dev earljs
```

## Example

```typescript
import { expect } from 'earljs'

// ...

expect(response).toEqual({
  body: { trimmed: true, timestamp: expect.a(String) },
})
```

## Docs

- [Getting started](https://earljs.dev/docs/introduction/getting-started)
- [Step by step guide](https://earljs.dev/docs/introduction/step-by-step-guide)
- [API reference](https://earljs.dev/docs/api/api-reference)

## ✨ Contributors

[Our contributing guide](./CONTRIBUTING.md).

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4" width="100px;" alt="Kris Kaczor"/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=krzkaczor" title="Code">💻</a> <a href="https://github.com/earl-js/earl/commits?author=krzkaczor" title="Documentation">📖</a> <a href="#ideas-krzkaczor" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4" width="100px;" alt="Piotr Szlachciak"/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=sz-piotr" title="Code">💻</a> <a href="#ideas-sz-piotr" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-sz-piotr" title="Design">🎨</a></td><td align="center"><a href="http://twitter.com/quezak2"><img src="https://avatars0.githubusercontent.com/u/666206?v=4" width="100px;" alt="Artur Kozak"/><br /><sub><b>Artur Kozak</b></sub></a><br /><a href="#ideas-quezak" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/LogvinovLeon"><img src="https://avatars1.githubusercontent.com/u/6204356?v=4" width="100px;" alt="Leonid Logvinov"/><br /><sub><b>Leonid Logvinov</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=LogvinovLeon" title="Documentation">📖</a> <a href="https://github.com/earl-js/earl/commits?author=LogvinovLeon" title="Code">💻</a></td><td align="center"><a href="https://pantas.net"><img src="https://avatars3.githubusercontent.com/u/4291324?v=4" width="100px;" alt="Ivan Pantic"/><br /><sub><b>Ivan Pantic</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=panta82" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/grzpab"><img src="https://avatars2.githubusercontent.com/u/35925521?v=4" width="100px;" alt="grzpab"/><br /><sub><b>grzpab</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=grzpab" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions of any kind welcome!

Earl logo by [@sz-piotr](https://github.com/sz-piotr)

# License

Kris Kaczor MIT
