![Earl](https://raw.githubusercontent.com/earl-js/earl/master/packages/docs/images/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library for TypeScript</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/dethcrypto/earl/workflows/CI/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square">
    <a href="https://discord.gg/wQDkeDgzgv"><img alt="Join our discord!" src="https://img.shields.io/discord/895381864922091630.svg?color=7289da&label=deth&logo=discord&style=flat-square"></a>
  </p>
</p>

## Features

- 💪 Powerful validators and matchers
- 🤖 Type-safe - written in TypeScript and goes well with static analysis
- 🎭 Builtin support for mocks
- ☕ Works great with Mocha
- 📸 Snapshot testing
- 🔌 Extensible with plugins

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

- [Getting started](https://earljs.dev/docs)
- [Step by step guide](https://earljs.dev/docs/introduction/step-by-step-guide)
- [API reference](https://earljs.dev/docs/api/api-reference)

## ✨ Contributors

We welcome all kinds of contributions!
[Read our contributing guide](./CONTRIBUTING.md).

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=krzkaczor" title="Code">💻</a> <a href="#ideas-krzkaczor" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-krzkaczor" title="Design">🎨</a> <a href="https://github.com/earl-js/earl/commits?author=krzkaczor" title="Documentation">📖</a> <a href="#maintenance-krzkaczor" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=sz-piotr" title="Code">💻</a> <a href="#ideas-sz-piotr" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-sz-piotr" title="Design">🎨</a> <a href="https://github.com/earl-js/earl/commits?author=sz-piotr" title="Documentation">📖</a> <a href="#maintenance-sz-piotr" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://twitter.com/quezak2"><img src="https://avatars0.githubusercontent.com/u/666206?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artur Kozak</b></sub></a><br /><a href="#ideas-quezak" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/LogvinovLeon"><img src="https://avatars1.githubusercontent.com/u/6204356?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Leonid Logvinov</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=LogvinovLeon" title="Documentation">📖</a> <a href="https://github.com/earl-js/earl/commits?author=LogvinovLeon" title="Code">💻</a></td>
    <td align="center"><a href="https://pantas.net"><img src="https://avatars3.githubusercontent.com/u/4291324?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan Pantic</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=panta82" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/grzpab"><img src="https://avatars2.githubusercontent.com/u/35925521?v=4?s=100" width="100px;" alt=""/><br /><sub><b>grzpab</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=grzpab" title="Code">💻</a> <a href="https://github.com/earl-js/earl/commits?author=grzpab" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/krzysztof-jelski"><img src="https://avatars3.githubusercontent.com/u/430616?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Krzysztof Jelski</b></sub></a><br /><a href="#ideas-krzysztof-jelski" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/rkrupinski"><img src="https://avatars.githubusercontent.com/u/775177?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafał Krupiński</b></sub></a><br /><a href="https://github.com/earl-js/earl/issues?q=author%3Arkrupinski" title="Bug reports">🐛</a> <a href="https://github.com/earl-js/earl/commits?author=rkrupinski" title="Code">💻</a></td>
    <td align="center"><a href="https://haspar.us/"><img src="https://avatars.githubusercontent.com/u/15332326?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Piotr Monwid-Olechnowicz</b></sub></a><br /><a href="https://github.com/earl-js/earl/commits?author=hasparus" title="Code">💻</a> <a href="https://github.com/earl-js/earl/commits?author=hasparus" title="Documentation">📖</a> <a href="#maintenance-hasparus" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Earl logo by [@sz-piotr](https://github.com/sz-piotr)

# License

dΞth MIT
