![Earl](https://raw.githubusercontent.com/l2beat/earl/master/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library for TypeScript</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/l2beat/earl/workflows/CI/badge.svg">
    <a href="https://github.com/l2beat/earl/tree/master/LICENSE"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
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
npm install --save-dev earl
```

**Note:** It's `earljs` not `earl`!

## Example

```typescript
import { expect } from "earl";

// ...

expect(response).toEqual({
  body: { trimmed: true, timestamp: expect.a(String) },
});
```

## Docs

- [Getting started](https://earljs.dev/introduction/getting-started.html)
- [Step by step guide](https://earljs.dev/introduction/step-by-step-guide.html)
- [API reference](https://earljs.dev/api/api-reference.html)

# License

Published under the MIT License. Copyright © 2023 L2BEAT.
