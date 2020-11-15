import { expect } from 'chai'
import { spy } from 'sinon'

import { autoloadPluginsFromDir, findPluginsInDir } from '../../src/plugins'
import { Fs } from '../../src/plugins/io/fs'

describe('findPluginsInDir', () => {
  it('works', () => {
    const dummyFs: Fs = {
      readFile: spy(),
      writeFile: spy(),
      listDir: spy(() => [
        '/node_modules/a',
        '/node_modules/earljs-plugin-test1',
        '/node_modules/earljs',
        '/node_modules/earljs-plugin-test2',
      ]),
    }

    const plugins = findPluginsInDir({ fs: dummyFs }, '/')

    expect(dummyFs.listDir).to.have.been.calledOnceWithExactly('/')
    expect(plugins).to.be.deep.eq(['/node_modules/earljs-plugin-test1', '/node_modules/earljs-plugin-test2'])
  })
})

describe('autoloadPluginsFromDir', () => {
  it('works', () => {
    const dummyFs: Fs = {
      readFile: spy(),
      writeFile: spy(),
      listDir: spy(() => [
        '/node_modules/a',
        '/node_modules/earljs-plugin-test1',
        '/node_modules/earljs',
        '/node_modules/earljs-plugin-test2',
      ]),
    }

    const dummyPluginLoader = spy()

    autoloadPluginsFromDir({ fs: dummyFs, loadPlugin: dummyPluginLoader }, '/')

    expect(dummyPluginLoader).to.have.been.calledTwice
    expect(dummyPluginLoader).to.have.been.calledWith('/node_modules/earljs-plugin-test1')
    expect(dummyPluginLoader).to.have.been.calledWith('/node_modules/earljs-plugin-test2')
  })
})
