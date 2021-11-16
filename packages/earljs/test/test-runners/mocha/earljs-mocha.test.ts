import { expect } from 'chai'
// @ts-expect-error missing typings, but they match child_process.spawn
import _spawn from 'cross-spawn-with-kill'

const spawn = _spawn as typeof import('child_process').spawn

describe('earljs/mocha end-to-end tests', () => {
  it('works in watch mode', async () => {
    // There might be a way to handle it in a more elegant manner...
    const PASSING_TESTS = 1
    const FAILING_TESTS = 1

    const results = await runMochaWatch()

    expect({ passing: results.passing, failing: results.failing }).to.deep.equal(
      {
        passing: PASSING_TESTS,
        failing: FAILING_TESTS,
      },
      `Expected to pass ${PASSING_TESTS} instead of ${results.passing} and fail ${FAILING_TESTS} instead of ${results.failing}.\n` +
        `\nSTDOUT:\n\`${results.stdout}\`` +
        `\nSTDERR:\n\`${results.stderr}\`\n\n`,
    )
  })
})

function runMochaWatch() {
  return new Promise<{ passing: number; failing: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn('mocha', ['--config', './mocha.config.js', '--watch'], {
      env: process.env,
      cwd: __dirname,
    }).on('error', (err) => {
      throw err
    })

    const result = { passing: NaN, failing: NaN, stdout: '', stderr: '' }

    child.stderr.on('data', (data) => {
      const str = String(data)
      result.stderr += str

      if (str.includes('[mocha] waiting for changes...')) {
        child.kill('SIGINT')
        resolve(result)
      }
    })
    child.stdout.on('data', (data) => {
      const str = String(data)
      result.stdout += str

      const passing = str.match(/(\d+) passing/)
      if (passing) {
        result.passing = parseInt(passing[1])
      }
      const failing = str.match(/(\d+) failing/)
      if (failing) {
        result.failing = parseInt(failing[1])
      }
    })
  })
}
