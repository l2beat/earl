# earljs

## 0.1.8

### Patch Changes

- 69c6af3: Add `toReferentiallyEqual` validator performing referential equality
- 3f2ebc2: Improve `ErrorMatcher` description in error strings
- 3f2ebc2: [Plugin devs] Make `control.assert` return `never` not `void`.

## 0.1.7

### Patch Changes

- 1ef1ad2: Adds the getControl function which is intended to be used by plugins.

## 0.1.6

### Patch Changes

- 125c29b: Tweak `toHaveBeenCalledExactlyWith` input type to properly support arrays
- 923847b: Made `expect.a(Array)` return type be `any[]` not `unknown[]` which works well with `toEqual`.

## 0.1.5

### Patch Changes

- 1eac490: Add `toMatchSnapshot` validator

## 0.1.4

### Patch Changes

- 591dccc: Add readme to the final npm package

## 0.1.3

### Patch Changes

- 4964a16: Migrated to monorepo.
- 4964a16: Fix bug in `StringMatching` matcher that prevented it from matching strings with special characters
- 1e3951d: Added new matchers: `arrayWith`, `objectWith` Improve `containerWith` to work with multiple values
- 4964a16: Added experimental plugin API.

## 0.1.2

### Patch Changes

- 0f490bd: Tweak `toBeRejected` validator signature to be properly async (return `Promise<void>`). This was a bug in
  typings not in behaviour.

## 0.1.1

### Patch Changes

- d2efbc6: Change compilation target to ES2015 to enable running on older node.js versions
- 42ed317: Added `containerWith` matcher, allowing to match a iterable containing given value
