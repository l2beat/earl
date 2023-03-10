import { expect } from '@earljs/published'
// @ts-expect-error missing typings, but they match child_process.spawn
import _spawn from 'cross-spawn-with-kill'
import debug from 'debug'
import { stderr } from 'process'

const d = debug('test:mocha-integration')

const spawn = _spawn as typeof import('child_process').spawn

// There might be a way to handle it in a more elegant manner...
const PASSING_TESTS = 1
const FAILING_TESTS = 1
const expected = { passing: PASSING_TESTS, failing: FAILING_TESTS }

describe('earljs/mocha end-to-end tests', function (this: Mocha.Suite) {
  this.timeout(10000)

  it('works in run mode', async () => {
    const res = await runMocha({})

    expect({ passing: res.passing, failing: res.failing }, errorMessage(res)).toEqual(expected)
  })

  it.skip('works in parallel run mode', async () => {
    // TODO: doesn't work in node >= 16
    const res = await runMocha({ parallel: true })

    expect({ passing: res.passing, failing: res.failing }, errorMessage(res)).toEqual(expected)
  })

  it('works in watch mode', async () => {
    const res = await runMocha({ watch: true })

    expect({ passing: res.passing, failing: res.failing }, errorMessage(res)).toEqual(expected)
  })

  it.skip('works in parallel watch mode', async () => {
    // TODO: doesn't work in node >= 16
    const res = await runMocha({ parallel: true, watch: true })

    expect({ passing: res.passing, failing: res.failing }, errorMessage(res)).toEqual(expected)
  })
})

function errorMessage(results: TestResults) {
  return {
    extraMessage:
      `Expected to pass ${PASSING_TESTS} instead of ${results.passing} and fail ${FAILING_TESTS} instead of ${results.failing}.\n` +
      `\nSTDOUT:\n\`${results.stdout}\`` +
      `\nSTDERR:\n\`${results.stderr}\`\n\n`,
  }
}

interface TestResults {
  passing: number
  failing: number
  stdout: string
  stderr: string
}

function runMocha(modes: { watch?: boolean; parallel?: boolean }) {
  return new Promise<TestResults>((resolve, reject) => {
    const child = spawn(
      'mocha',
      ['--config', './mocha-config.tested.js', modes.watch && '--watch', modes.parallel && '--parallel'].filter(
        (x): x is string => !!x,
      ),
      { env: process.env, cwd: __dirname },
    )

    const result = { passing: NaN, failing: NaN, stdout: '', stderr: '' }

    const fail = (err: string | Error) => {
      child.kill('SIGKILL')
      reject(typeof err === 'string' ? new Error(err) : err)
    }
    const succeed = () => {
      child.kill('SIGKILL')
      resolve(result)
    }

    child.stderr.on('data', (data) => {
      const str = String(data)
      result.stderr += str

      const ERROR_PREFIXES = ['\n× \x1B[31mERROR:\x1B[39m Error:', '(node:']

      if (ERROR_PREFIXES.some((prefix) => str.startsWith(prefix))) {
        fail('Process crashed.\n' + str)
      }

      d(`stderr: ${str}`)

      if (modes.watch) {
        if (str.includes('[mocha] waiting for changes...')) {
          succeed()
        }
      }
    })
    child.stdout.on('data', (data) => {
      const str = String(data)
      result.stdout += str

      d(`stdout: ${str}`)

      const passing = str.match(/(\d+) passing/)
      if (passing) {
        result.passing = parseInt(passing[1])
      }
      const failing = str.match(/(\d+) failing/)
      if (failing) {
        result.failing = parseInt(failing[1])
        if (!modes.watch) {
          succeed()
        }
      }
    })
    child.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error({ stderr })
      fail(err)
    })
  })
}
