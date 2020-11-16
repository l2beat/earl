import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export interface Fs {
  readFile(path: string): string
  writeFile(path: string, contents: string): void
  listDir(path: string): string[]
}

export const realFs: Fs = {
  readFile(path) {
    return readFileSync(path, 'utf-8')
  },

  writeFile(path, contents) {
    writeFileSync(path, contents, 'utf-8')
  },

  listDir(path) {
    return readdirSync(path).map((relPath) => join(path, relPath))
  },
}
