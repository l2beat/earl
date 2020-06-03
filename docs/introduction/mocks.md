---
id: mocks
title: Mocks (PREVIEW)
---

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
```
