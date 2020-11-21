# earljs

## 0.1.2

### Patch Changes

- 0f490bd: Tweak `toBeRejected` validator signature to be properly async (return
  `Promise<void>`). This was a bug in typings not in behaviour.

## 0.1.1

### Patch Changes

- d2efbc6: Change compilation target to ES2015 to enable running on older
  node.js versions
- 42ed317: Added `containerWith` matcher, allowing to match a iterable
  containing given value
