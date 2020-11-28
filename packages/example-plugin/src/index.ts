// instead of ugly "deep" import
// import { loadPlugin } from 'earljs/dist/plugins/load'
// use auxiliary package.json
import { loadPlugin } from 'earljs/internals'

import { numberUtilsPlugin } from './NumberUtilsPlugin'

loadPlugin(numberUtilsPlugin)
