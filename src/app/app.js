const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const kill = require('kill-port')
const { loadControllers, scopePerRequest } = require('awilix-express')
const { resolve } = require('path')
const {
  logErrorMiddleware,
  returnError,
  databaseErrors,
} = require('./common/controllers/error-handling/errorHandler')
const httpLogger = require('./common/controllers/logger/httpLogger')
const logger = require('./common/controllers/logger/logger')

class App {
  constructor(appConfig) {
    this.appConfig = appConfig
  }

  async start(container, callback) {
    const app = this._create(container)
    const port = this.appConfig.port
    await kill(port)
    app.listen(port, callback(port))
  }
  _create(container) {
    const app = express()

    app.use(bodyParser.json())
    app.use(cors())
    app.use(httpLogger)

    app.set('json spaces', 2)
    app.set('json replacer', (k, v) => (v === null ? undefined : v))

    app.use(scopePerRequest(container))
    //Automatically load all controller routes
    app.use(
      loadControllers(`${resolve('src')}/**/*.controller.js`, {
        cwd: __dirname,
      })
    )
    app.use(logErrorMiddleware)
    app.use(databaseErrors)
    app.use(returnError)
    return app
  }
}

module.exports = App
