export class EarlConfigurationError extends Error {
  constructor(reason: string) {
    super(`Earl configuration error: ${reason}`)
  }
}
