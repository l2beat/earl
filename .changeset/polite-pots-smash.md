---
'earljs': patch
---

Tweak `toBeRejected` validator signature to be properly async (return
`Promise<void>`). This was a bug in typings not in behaviour.
