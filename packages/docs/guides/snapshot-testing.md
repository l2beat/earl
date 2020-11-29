---
title: Snapshot testing
---

Earl supports Jest's snapshots tests. Only `toMatchSnapshot` is supported right
now - no inline snapshots support.

## Basic usage

```typescript
import { expect } from 'earljs'

describe('snapshots', () => {
  it('work', () => {
    expect({ very: { nested: { wow: 'wow' } } }).toMatchSnapshot()
  })
})
```

Matches actual value to a snapshot. The name of the snapshot is derived from the
suite and test case names. A snapshot will be created under `__snapshot__`
folder.

If a snapshot doesn't exist, it will be created. If it exists, actual values
will be asserted against it. Set `UPDATE_SNAPSHOTS=true` environment variable to
update snapshots instead. On CI no snapshots will be updated/created.

Multiple snapshots in one test case work as expected.

Requires [test runner integration](/guides/test-runner-integration.md).

## Read more

- [Jest documentation about snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
- [Effective snapshot testing (MUST READ)](https://kentcdodds.com/blog/effective-snapshot-testing)
