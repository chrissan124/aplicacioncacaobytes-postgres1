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
const validateToken = require('./common/authentication/middleware/authenticateUser')
const unless = require('./common/authentication/middleware/unless')
const bootstrapJobs = require('./common/jobs')
const paginateResponse = require('./common/controllers/pagination/paginateResponse')

const corsOptions = {
  exposedHeaders: ['X-Total-Count', 'Last-Page'],
}

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
    app.use(cors(corsOptions))
    app.use(httpLogger)

    app.set('json spaces', 2)
    app.set('json replacer', (k, v) => (v === null ? undefined : v))
    //authentication middleware
    app.use(
      unless(
        validateToken(
          container.resolve('verifyUserService'),
          container.resolve('checkBlackListService')
        ),
        ...this.appConfig.freeRoutes
      )
    )

    app.use(scopePerRequest(container))

    bootstrapJobs(container)

    app.use(
      `${this.appConfig.prefix}/storage`,
      express.static(`${this.appConfig.storage}`)
    )
    const loadedRoutes = loadControllers(
      `${resolve('src')}/**/*.controller.js`,
      {
        cwd: __dirname,
      }
    )

    //Automatically load all controller routes
    app.use(this.appConfig.prefix, loadedRoutes)
    app.use(paginateResponse)
    app.use(logErrorMiddleware)
    app.use(databaseErrors)
    app.use(returnError)
    return app
  }
}

module.exports = App
