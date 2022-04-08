import '../src'

import { pathExists } from 'fs-extra'
import waitFor from 'p-wait-for'

before(() => waitFor(() => pathExists(require.resolve('../../earljs/dist/internals'))))
