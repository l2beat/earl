/* eslint-disable no-console */
import { execSync, ExecSyncOptions } from 'child_process'
import { resolve } from 'path'

before(function (this: Mocha.Context) {
  const isCI = !!process.env.CI && process.env.CI !== 'false'
  const skipBuild = isCI || ['1', 'true'].includes(process.env.SKIP_EARL_BUILD as string)

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
    exec('pnpm build', { cwd: earlPkgDir, errorMsg: 'Failed to build Earl.' })

    console.log('🔧 Linking local earljs in end-to-end tests project...')

    // Ensure that workspace version of earljs is used in test-e2e project
    exec(`pnpm install`, { cwd: testPkgDir })

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
