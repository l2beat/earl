export type Awaited<T> = T extends PromiseLike<infer PT> ? PT : never
