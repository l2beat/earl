# earljs

## 0.2.3

### Patch Changes

- 1887ac2: Snapshot tests in `uvu` are now supported with `earljs/uvu`.

  To use Earl with `uvu`, require `earljs/uvu` in your test command:

  ```sh
  # using the uvu cli
  $ uvu -r earljs/uvu tests

  # using node directly
  $ node -r earljs/uvu tests/example.test.js
  ```

## 0.2.2

### Patch Changes

- fde9d67: Fixed "a" matcher for functions

## 0.2.1

### Patch Changes

- 7378e50: Earl formatting no longer crashes on object with constructor set to undefined.

## 0.2.0

### Minor Changes

- 7dca1a2: Assertion errors throw with clean (without internal entries) stack traces
- 3973df6: Redo equality algorithm, improve error diffs

### Patch Changes

- 489321e: Add new validators and matchers: `toBeTruthy`, `toBeFalsy`, `toBeDefined`, `toBeNullish`
- 05013cd: Make `toBeAnArrayWith` and `toBeAContainerWith` handle repeated items as expected
- 489321e: Allow to override `toEqual` types via plugins

## 0.1.12

### Patch Changes

- afbd34b: Ensure that package is published with the readme. Readme updates.

## 0.1.11

### Patch Changes

- d69576f: Fix types for mockFn's default implementation
- 00cae63: Function mocks can now be typed as Mock.Of<TFunctionType>
- a0f7b98: Improve support for comparing recursive objects
- 3651e17: Earl no longer crashes in mocha --watch mode
- d02b7d6: process.env.UPDATE_SNAPSHOTS set to "1" is now treated the same as when set to "true"

## 0.1.10

### Patch Changes

- f37f7fa: Improve types for `rejectsWithOnce` and ensure that no unhandled rejection error can be thrown.
- f37f7fa: Make `objectWith` work with all kinds of objects, not only with plain objects. This is a breaking change.

## 0.1.9

### Patch Changes

- c4c75c8: `Control.assert` type changed from never to void.
- ceb7d92: Added new validators:

  - `toBeA`
  - `toBeAContainerWith`
  - `toBeAnArrayOfLength`
  - `toBeAnArrayWith`
  - `toBeAnObjectWith`

  Added new matchers:

  - `expect.arrayOfLength`

- 3335eca: Stop exporting `loadMatchers` from the main entry point.
- d99dcee: Add new number validators:
  - `toBeGreaterThanOrEqualTo(number)`
  - `toBeLessThan(number)`
  - `toBeLessThanOrEqualTo(number)`
  - `toBeExhausted(number)`
- 3335eca: Replace `Partial<PluginConfig>` instances with the equivalent `PluginConfig`.
- c4c75c8: Added `Control.fail`.
- 3335eca: Improve doc comments and function parameter names for the public library exports.

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
