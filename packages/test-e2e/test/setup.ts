/* eslint-disable no-console */
import { execSync, ExecSyncOptions } from 'child_process'
import { pathExists } from 'fs-extra'
import { resolve } from 'path'

before(async function () {
  const SKIP_EARL_BUILD = process.env.SKIP_EARL_BUILD as string
  const isCI = !!process.env.CI && process.env.CI !== 'false'
  const alreadyBuilt = await pathExists(require.resolve('../../earljs/dist/internals'))

  let skipBuild = isCI || alreadyBuilt

  if (['1', 'true'].includes(SKIP_EARL_BUILD)) skipBuild = true
  else if (['0', 'false'].includes(SKIP_EARL_BUILD)) skipBuild = false

  if (!skipBuild) {
    // These are end-to-end tests, so we need local EarlJS to be built and present
    // in node_modules, exactly as the user would have it.
    // We skip installation on CI, because the packages will be already built.
    // The developer, however, can repeatedly change the package and rerun end-to-end tests.
    this.timeout(20000)
    const testPkgDir = resolve(__dirname, '..')
    const relativeEarlPkgDir = '../earljs'
    const earlPkgDir = resolve(testPkgDir, relativeEarlPkgDir)

    console.log('🔨 Building earljs...')
    exec('yarn build', { cwd: earlPkgDir, errorMsg: 'Failed to build Earl.' })

    console.log('🔧 Linking local earljs in end-to-end tests project...')

    // Using `link` instead of `file:` protocol helps keeping package.json unchanged
    // and performs a bit faster, albeit it doesn't support aliases like "@earljs/local".
    exec(`yarn link`, { cwd: earlPkgDir })
    exec(`yarn link earljs`, { cwd: testPkgDir })

    console.log('🧪 Running end-to-end tests...\n')
  }
})

function exec(command: string, { errorMsg, ...options }: ExecSyncOptions & { errorMsg?: string }) {
  try {
    execSync(command, {
      ...options,
      stdio: 'pipe',
      encoding: 'utf-8',
    })
  } catch (err) {
    console.error(...['🔥', errorMsg && red(errorMsg), (err as Error).message].filter(Boolean).join(' '))
    process.exit(1)
  }
}

function red(msg: string) {
  return `\x1b[31m${msg}\x1b[0m`
}
