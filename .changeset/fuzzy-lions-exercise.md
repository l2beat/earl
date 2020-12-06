---
'earljs': patch
---

Made `expect.a(Array)` return type be `any[]` not `unknown[]` which works well
with `toEqual`.
