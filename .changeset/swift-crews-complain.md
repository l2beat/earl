---
"earl": major
---

Make string snapshots preserve new lines. This makes snapshots of long strings, such as source code easy to review.

This change is backwards-compatible, meaning that previously recorded snapshots remain valid. However, once you update snapshots, the new style will be used, and snapshots may be updated even if the underlying object stays the same.
